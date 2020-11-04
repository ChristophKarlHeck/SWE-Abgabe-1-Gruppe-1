"use strict";
/* eslint-disable max-lines */
/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuchService = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("./errors");
const entity_1 = require("../entity");
const shared_1 = require("../../shared");
const mock_1 = require("./mock");
const json5_1 = tslib_1.__importDefault(require("json5"));
const mongoose_1 = require("mongoose");
const { mockDB } = shared_1.dbConfig;
// API-Dokumentation zu mongoose:
// http://mongoosejs.com/docs/api.html
// https://github.com/Automattic/mongoose/issues/3949
/* eslint-disable require-await, no-null/no-null, unicorn/no-useless-undefined */
// BEACHTE: asynchrone Funktionen in der Klasse erfordern kein top-level await
class BuchService {
    constructor() {
        if (mockDB) {
            this.mock = new mock_1.BuchServiceMock();
        }
    }
    // Status eines Promise:
    // Pending: das Resultat gibt es noch nicht, weil die asynchrone Operation,
    //          die das Resultat liefert, noch nicht abgeschlossen ist
    // Fulfilled: die asynchrone Operation ist abgeschlossen und
    //            das Promise-Objekt hat einen Wert
    // Rejected: die asynchrone Operation ist fehlgeschlagen and das
    //           Promise-Objekt wird nicht den Status "fulfilled" erreichen.
    //           Stattdessen ist im Promise-Objekt die Fehlerursache enthalten.
    async findById(id) {
        if (this.mock !== undefined) {
            return this.mock.findById(id);
        }
        shared_1.logger.debug(`BuchService.findById(): id= ${id}`);
        // ein Buch zur gegebenen ID asynchron suchen
        // Pattern "Active Record" (urspruengl. von Ruby-on-Rails)
        // null falls nicht gefunden
        // lean() liefert ein "Plain JavaScript Object" statt ein Mongoose Document
        // so dass der virtuelle getter "id" auch nicht mehr vorhanden ist
        const buch = await entity_1.BuchModel.findById(id).lean();
        return buch !== null && buch !== void 0 ? buch : undefined;
    }
    async find(query) {
        if (this.mock !== undefined) {
            return this.mock.find(query);
        }
        shared_1.logger.debug(`BuchService.find(): query=${json5_1.default.stringify(query)}`);
        // alle Buecher asynchron suchen u. aufsteigend nach titel sortieren
        // https://docs.mongodb.org/manual/reference/object-id
        // entries(): { titel: 'a', rating: 5 } => [{ titel: 'x'}, {rating: 5}]
        if (query === undefined || Object.entries(query).length === 0) {
            shared_1.logger.debug('BuchService.find(): alle Buecher');
            // lean() liefert ein "Plain JavaScript Object" statt ein Mongoose Document
            return entity_1.BuchModel.find().sort('titel').lean();
        }
        // { titel: 'a', rating: 5, javascript: true }
        const { titel, javascript, typescript, ...dbQuery } = query; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        // Buecher zur Query (= JSON-Objekt durch Express) asynchron suchen
        if (titel !== undefined) {
            // Titel in der Query: Teilstring des Titels,
            // d.h. "LIKE" als regulaerer Ausdruck
            // 'i': keine Unterscheidung zw. Gross- u. Kleinschreibung
            // NICHT /.../, weil das Muster variabel sein muss
            // CAVEAT: KEINE SEHR LANGEN Strings wg. regulaerem Ausdruck
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            if (titel.length < 10) {
                dbQuery.titel = new RegExp(titel, 'iu'); // eslint-disable-line security/detect-non-literal-regexp
            }
        }
        // z.B. {javascript: true, typescript: true}
        const schlagwoerter = [];
        if (javascript === 'true') {
            schlagwoerter.push('JAVASCRIPT');
        }
        if (typescript === 'true') {
            schlagwoerter.push('TYPESCRIPT');
        }
        if (schlagwoerter.length === 0) {
            delete dbQuery.schlagwoerter;
        }
        else {
            dbQuery.schlagwoerter = schlagwoerter;
        }
        shared_1.logger.debug(`BuchService.find(): dbQuery=${json5_1.default.stringify(dbQuery)}`);
        // Pattern "Active Record" (urspruengl. von Ruby-on-Rails)
        // leeres Array, falls nichts gefunden wird
        // lean() liefert ein "Plain JavaScript Object" statt ein Mongoose Document
        return entity_1.BuchModel.find(dbQuery).lean();
        // Buch.findOne(query), falls das Suchkriterium eindeutig ist
        // bei findOne(query) wird null zurueckgeliefert, falls nichts gefunden
    }
    async create(buchData) {
        if (this.mock !== undefined) {
            return this.mock.create(buchData);
        }
        shared_1.logger.debug(`BuchService.create(): buchData=${json5_1.default.stringify(buchData)}`);
        const result = await this.validateCreate(buchData);
        if (result instanceof errors_1.BuchServiceError) {
            return result;
        }
        const buch = new entity_1.BuchModel(buchData);
        let buchSaved;
        // https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
        const session = await mongoose_1.startSession();
        try {
            await session.withTransaction(async () => {
                buchSaved = await buch.save();
            });
        }
        catch (err) {
            shared_1.logger.error(`BuchService.create(): Die Transaktion wurde abgebrochen: ${json5_1.default.stringify(err)}`);
            // TODO [2030-09-30] Weitere Fehlerbehandlung bei Rollback
        }
        finally {
            session.endSession();
        }
        const buchDataSaved = buchSaved.toObject(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        shared_1.logger.debug(`BuchService.create(): buchDataSaved=${json5_1.default.stringify(buchDataSaved)}`);
        await this.sendmail(buchDataSaved);
        return buchDataSaved;
    }
    async update(buchData, versionStr) {
        if (this.mock !== undefined) {
            return this.mock.update(buchData);
        }
        shared_1.logger.debug(`BuchService.update(): buchData=${json5_1.default.stringify(buchData)}`);
        shared_1.logger.debug(`BuchService.update(): versionStr=${versionStr}`);
        const validateResult = await this.validateUpdate(buchData, versionStr);
        if (validateResult instanceof errors_1.BuchServiceError) {
            return validateResult;
        }
        // findByIdAndReplace ersetzt ein Document mit ggf. weniger Properties
        const buch = new entity_1.BuchModel(buchData);
        const updateOptions = { new: true };
        const result = await entity_1.BuchModel.findByIdAndUpdate(buch._id, buch, updateOptions).lean();
        if (result === null) {
            return new errors_1.BuchNotExists(buch._id);
        }
        if (result.__v !== undefined) {
            result.__v++;
        }
        shared_1.logger.debug(`BuchService.update(): result=${json5_1.default.stringify(result)}`);
        // Weitere Methoden von mongoose zum Aktualisieren:
        //    Buch.findOneAndUpdate(update)
        //    buch.update(bedingung)
        return Promise.resolve(result);
    }
    async delete(id) {
        if (this.mock !== undefined) {
            return this.mock.remove(id);
        }
        shared_1.logger.debug(`BuchService.delete(): id=${id}`);
        // Das Buch zur gegebenen ID asynchron loeschen
        const { deletedCount } = await entity_1.BuchModel.deleteOne({ _id: id }); // eslint-disable-line @typescript-eslint/naming-convention
        shared_1.logger.debug(`BuchService.delete(): deletedCount=${deletedCount}`);
        return deletedCount !== undefined;
        // Weitere Methoden von mongoose, um zu loeschen:
        //  Buch.findByIdAndRemove(id)
        //  Buch.findOneAndRemove(bedingung)
    }
    async validateCreate(buch) {
        const msg = entity_1.validateBuch(buch);
        if (msg !== undefined) {
            shared_1.logger.debug(`BuchService.validateCreate(): Validation Message: ${json5_1.default.stringify(msg)}`);
            return new errors_1.BuchInvalid(msg);
        }
        // statt 2 sequentiellen DB-Zugriffen waere 1 DB-Zugriff mit OR besser
        const resultTitel = await this.checkTitelExists(buch);
        if (resultTitel !== undefined) {
            return resultTitel;
        }
        const resultIsbn = await this.checkIsbnExists(buch);
        if (resultIsbn !== undefined) {
            return resultIsbn;
        }
        shared_1.logger.debug('BuchService.validateCreate(): ok');
        return undefined;
    }
    async checkTitelExists(buch) {
        const { titel } = buch;
        // Pattern "Active Record" (urspruengl. von Ruby-on-Rails)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const tmpId = await entity_1.BuchModel.findOne({ titel }, { _id: true }).lean();
        if (tmpId !== null) {
            shared_1.logger.debug(`BuchService.checkTitelExists(): _id=${json5_1.default.stringify(tmpId)}`);
            return new errors_1.TitelExists(titel, tmpId);
        }
        shared_1.logger.debug('BuchService.checkTitelExists(): ok');
        return undefined;
    }
    async checkIsbnExists(buch) {
        const { isbn } = buch;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const tmpId = await entity_1.BuchModel.findOne({ isbn }, { _id: true }).lean();
        if (tmpId !== null) {
            shared_1.logger.debug(`BuchService.checkIsbnExists(): buch=${json5_1.default.stringify(tmpId)}`);
            return new errors_1.IsbnExists(isbn, tmpId);
        }
        shared_1.logger.debug('BuchService.checkIsbnExists(): ok');
        return undefined;
    }
    async sendmail(buchData) {
        if (shared_1.serverConfig.cloud !== undefined) {
            // In der Cloud kann man z.B. "@sendgrid/mail" statt
            // "nodemailer" mit lokalem Mailserver verwenden
            return;
        }
        const from = '"Joe Doe" <Joe.Doe@acme.com>';
        const to = '"Foo Bar" <Foo.Bar@acme.com>';
        const subject = `Neues Buch ${buchData._id}`;
        const body = `Das Buch mit dem Titel <strong>${buchData.titel}</strong> ist angelegt`;
        const data = { from, to, subject, html: body };
        shared_1.logger.debug(`sendMail(): data = ${json5_1.default.stringify(data)}`);
        try {
            const nodemailer = await Promise.resolve().then(() => tslib_1.__importStar(require('nodemailer'))); // eslint-disable-line node/no-unsupported-features/es-syntax
            await nodemailer.createTransport(shared_1.mailConfig).sendMail(data);
        }
        catch (err) {
            shared_1.logger.error(`BuchService.create(): Fehler beim Verschicken der Email: ${json5_1.default.stringify(err)}`);
        }
    }
    async validateUpdate(buch, versionStr) {
        const result = this.validateVersion(versionStr);
        if (typeof result !== 'number') {
            return result;
        }
        const version = result;
        shared_1.logger.debug(`BuchService.validateUpdate(): version=${version}`);
        shared_1.logger.debug(`BuchService.validateUpdate(): buch=${json5_1.default.stringify(buch)}`);
        const validationMsg = entity_1.validateBuch(buch);
        if (validationMsg !== undefined) {
            return new errors_1.BuchInvalid(validationMsg);
        }
        const resultTitel = await this.checkTitelExists(buch);
        if (resultTitel !== undefined && resultTitel.id !== buch._id) {
            return resultTitel;
        }
        const resultIdAndVersion = await this.checkIdAndVersion(buch._id, version);
        if (resultIdAndVersion !== undefined) {
            return resultIdAndVersion;
        }
        shared_1.logger.debug('BuchService.validateUpdate(): ok');
        return undefined;
    }
    validateVersion(versionStr) {
        if (versionStr === undefined) {
            const error = new errors_1.VersionInvalid(versionStr);
            shared_1.logger.debug(`BuchService.validateVersion(): VersionInvalid=${json5_1.default.stringify(error)}`);
            return error;
        }
        const version = Number.parseInt(versionStr, 10);
        if (Number.isNaN(version)) {
            const error = new errors_1.VersionInvalid(versionStr);
            shared_1.logger.debug(`BuchService.validateVersion(): VersionInvalid=${json5_1.default.stringify(error)}`);
            return error;
        }
        return version;
    }
    async checkIdAndVersion(id, version) {
        var _a;
        const buchDb = await entity_1.BuchModel.findById(id).lean();
        if (buchDb === null) {
            const result = new errors_1.BuchNotExists(id);
            shared_1.logger.debug(`BuchService.checkIdAndVersion(): BuchNotExists=${json5_1.default.stringify(result)}`);
            return result;
        }
        const versionDb = (_a = buchDb.__v) !== null && _a !== void 0 ? _a : 0;
        if (version < versionDb) {
            const result = new errors_1.VersionOutdated(id, version);
            shared_1.logger.debug(`BuchService.checkIdAndVersion(): VersionOutdated=${json5_1.default.stringify(result)}`);
            return result;
        }
        return undefined;
    }
}
exports.BuchService = BuchService;
/* eslint-enable require-await, no-null/no-null, unicorn/no-useless-undefined */
/* eslint-enable max-lines */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1Y2gvc2VydmljZS9idWNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhCQUE4QjtBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7QUFHSCxxQ0FRa0I7QUFDbEIsc0NBQW9EO0FBQ3BELHlDQUEwRTtBQUMxRSxpQ0FBeUM7QUFFekMsMERBQTBCO0FBRTFCLHVDQUF3QztBQUV4QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsaUJBQVEsQ0FBQztBQUU1QixpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLHFEQUFxRDtBQUVyRCxpRkFBaUY7QUFDakYsOEVBQThFO0FBQzlFLE1BQWEsV0FBVztJQUdwQjtRQUNJLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHNCQUFlLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsMkVBQTJFO0lBQzNFLGtFQUFrRTtJQUNsRSw0REFBNEQ7SUFDNUQsK0NBQStDO0lBQy9DLGdFQUFnRTtJQUNoRSx3RUFBd0U7SUFDeEUsMkVBQTJFO0lBRTNFLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBVTtRQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakM7UUFDRCxlQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWxELDZDQUE2QztRQUM3QywwREFBMEQ7UUFDMUQsNEJBQTRCO1FBQzVCLDJFQUEyRTtRQUMzRSxrRUFBa0U7UUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQVksQ0FBQztRQUMzRCxP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QUFLLENBQ1IsRUFBRSxDQUNOLENBQUM7WUFDRixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBc0IsRUFBRSxPQUFlOztRQUNuRSxNQUFNLE1BQU0sR0FBRyxNQUFNLGtCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBWSxDQUFDO1FBQzdELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsZUFBTSxDQUFDLEtBQUssQ0FDUixrREFBa0QsZUFBSyxDQUFDLFNBQVMsQ0FDN0QsTUFBTSxDQUNULEVBQUUsQ0FDTixDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxNQUFNLFNBQVMsU0FBRyxNQUFNLENBQUMsR0FBRyxtQ0FBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUFFO1lBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksd0JBQWUsQ0FBQyxFQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUQsZUFBTSxDQUFDLEtBQUssQ0FDUixvREFBb0QsZUFBSyxDQUFDLFNBQVMsQ0FDL0QsTUFBTSxDQUNULEVBQUUsQ0FDTixDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7U0FDakI7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUF6V0Qsa0NBeVdDO0FBQ0QsZ0ZBQWdGO0FBQ2hGLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG1heC1saW5lcyAqL1xuLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBCdWNoLCBCdWNoRGF0YSB9IGZyb20gJy4uL2VudGl0eSc7XG5pbXBvcnQge1xuICAgIEJ1Y2hJbnZhbGlkLFxuICAgIEJ1Y2hOb3RFeGlzdHMsXG4gICAgQnVjaFNlcnZpY2VFcnJvcixcbiAgICBJc2JuRXhpc3RzLFxuICAgIFRpdGVsRXhpc3RzLFxuICAgIFZlcnNpb25JbnZhbGlkLFxuICAgIFZlcnNpb25PdXRkYXRlZCxcbn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgQnVjaE1vZGVsLCB2YWxpZGF0ZUJ1Y2ggfSBmcm9tICcuLi9lbnRpdHknO1xuaW1wb3J0IHsgZGJDb25maWcsIGxvZ2dlciwgbWFpbENvbmZpZywgc2VydmVyQ29uZmlnIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IEJ1Y2hTZXJ2aWNlTW9jayB9IGZyb20gJy4vbW9jayc7XG5pbXBvcnQgdHlwZSB7IERvY3VtZW50IH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcbmltcG9ydCB0eXBlIHsgU2VuZE1haWxPcHRpb25zIH0gZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgeyBzdGFydFNlc3Npb24gfSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IHsgbW9ja0RCIH0gPSBkYkNvbmZpZztcblxuLy8gQVBJLURva3VtZW50YXRpb24genUgbW9uZ29vc2U6XG4vLyBodHRwOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9hcGkuaHRtbFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvbW9uZ29vc2UvaXNzdWVzLzM5NDlcblxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1hd2FpdCwgbm8tbnVsbC9uby1udWxsLCB1bmljb3JuL25vLXVzZWxlc3MtdW5kZWZpbmVkICovXG4vLyBCRUFDSFRFOiBhc3luY2hyb25lIEZ1bmt0aW9uZW4gaW4gZGVyIEtsYXNzZSBlcmZvcmRlcm4ga2VpbiB0b3AtbGV2ZWwgYXdhaXRcbmV4cG9ydCBjbGFzcyBCdWNoU2VydmljZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBtb2NrOiBCdWNoU2VydmljZU1vY2sgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgaWYgKG1vY2tEQikge1xuICAgICAgICAgICAgdGhpcy5tb2NrID0gbmV3IEJ1Y2hTZXJ2aWNlTW9jaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhdHVzIGVpbmVzIFByb21pc2U6XG4gICAgLy8gUGVuZGluZzogZGFzIFJlc3VsdGF0IGdpYnQgZXMgbm9jaCBuaWNodCwgd2VpbCBkaWUgYXN5bmNocm9uZSBPcGVyYXRpb24sXG4gICAgLy8gICAgICAgICAgZGllIGRhcyBSZXN1bHRhdCBsaWVmZXJ0LCBub2NoIG5pY2h0IGFiZ2VzY2hsb3NzZW4gaXN0XG4gICAgLy8gRnVsZmlsbGVkOiBkaWUgYXN5bmNocm9uZSBPcGVyYXRpb24gaXN0IGFiZ2VzY2hsb3NzZW4gdW5kXG4gICAgLy8gICAgICAgICAgICBkYXMgUHJvbWlzZS1PYmpla3QgaGF0IGVpbmVuIFdlcnRcbiAgICAvLyBSZWplY3RlZDogZGllIGFzeW5jaHJvbmUgT3BlcmF0aW9uIGlzdCBmZWhsZ2VzY2hsYWdlbiBhbmQgZGFzXG4gICAgLy8gICAgICAgICAgIFByb21pc2UtT2JqZWt0IHdpcmQgbmljaHQgZGVuIFN0YXR1cyBcImZ1bGZpbGxlZFwiIGVycmVpY2hlbi5cbiAgICAvLyAgICAgICAgICAgU3RhdHRkZXNzZW4gaXN0IGltIFByb21pc2UtT2JqZWt0IGRpZSBGZWhsZXJ1cnNhY2hlIGVudGhhbHRlbi5cblxuICAgIGFzeW5jIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubW9jayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLmZpbmRCeUlkKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZGVidWcoYEJ1Y2hTZXJ2aWNlLmZpbmRCeUlkKCk6IGlkPSAke2lkfWApO1xuXG4gICAgICAgIC8vIGVpbiBCdWNoIHp1ciBnZWdlYmVuZW4gSUQgYXN5bmNocm9uIHN1Y2hlblxuICAgICAgICAvLyBQYXR0ZXJuIFwiQWN0aXZlIFJlY29yZFwiICh1cnNwcnVlbmdsLiB2b24gUnVieS1vbi1SYWlscylcbiAgICAgICAgLy8gbnVsbCBmYWxscyBuaWNodCBnZWZ1bmRlblxuICAgICAgICAvLyBsZWFuKCkgbGllZmVydCBlaW4gXCJQbGFpbiBKYXZhU2NyaXB0IE9iamVjdFwiIHN0YXR0IGVpbiBNb25nb29zZSBEb2N1bWVudFxuICAgICAgICAvLyBzbyBkYXNzIGRlciB2aXJ0dWVsbGUgZ2V0dGVyIFwiaWRcIiBhdWNoIG5pY2h0IG1laHIgdm9yaGFuZGVuIGlzdFxuICAgICAgICBjb25zdCBidWNoID0gYXdhaXQgQnVjaE1vZGVsLmZpbmRCeUlkKGlkKS5sZWFuPEJ1Y2hEYXRhPigpO1xuICAgICAgICByZXR1cm4gYnVjaCA/PyB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZChxdWVyeT86IGFueSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy5tb2NrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vY2suZmluZChxdWVyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoYEJ1Y2hTZXJ2aWNlLmZpbmQoKTogcXVlcnk9JHtKU09ONS5zdHJpbmdpZnkocXVlcnkpfWApO1xuXG4gICAgICAgIC8vIGFsbGUgQnVlY2hlciBhc3luY2hyb24gc3VjaGVuIHUuIGF1ZnN0ZWlnZW5kIG5hY2ggdGl0ZWwgc29ydGllcmVuXG4gICAgICAgIC8vIGh0dHBzOi8vZG9jcy5tb25nb2RiLm9yZy9tYW51YWwvcmVmZXJlbmNlL29iamVjdC1pZFxuICAgICAgICAvLyBlbnRyaWVzKCk6IHsgdGl0ZWw6ICdhJywgcmF0aW5nOiA1IH0gPT4gW3sgdGl0ZWw6ICd4J30sIHtyYXRpbmc6IDV9XVxuICAgICAgICBpZiAocXVlcnkgPT09IHVuZGVmaW5lZCB8fCBPYmplY3QuZW50cmllcyhxdWVyeSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0J1Y2hTZXJ2aWNlLmZpbmQoKTogYWxsZSBCdWVjaGVyJyk7XG4gICAgICAgICAgICAvLyBsZWFuKCkgbGllZmVydCBlaW4gXCJQbGFpbiBKYXZhU2NyaXB0IE9iamVjdFwiIHN0YXR0IGVpbiBNb25nb29zZSBEb2N1bWVudFxuICAgICAgICAgICAgcmV0dXJuIEJ1Y2hNb2RlbC5maW5kKCkuc29ydCgndGl0ZWwnKS5sZWFuPEJ1Y2hEYXRhPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8geyB0aXRlbDogJ2EnLCByYXRpbmc6IDUsIGphdmFzY3JpcHQ6IHRydWUgfVxuICAgICAgICBjb25zdCB7IHRpdGVsLCBqYXZhc2NyaXB0LCB0eXBlc2NyaXB0LCAuLi5kYlF1ZXJ5IH0gPSBxdWVyeTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcblxuICAgICAgICAvLyBCdWVjaGVyIHp1ciBRdWVyeSAoPSBKU09OLU9iamVrdCBkdXJjaCBFeHByZXNzKSBhc3luY2hyb24gc3VjaGVuXG4gICAgICAgIGlmICh0aXRlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBUaXRlbCBpbiBkZXIgUXVlcnk6IFRlaWxzdHJpbmcgZGVzIFRpdGVscyxcbiAgICAgICAgICAgIC8vIGQuaC4gXCJMSUtFXCIgYWxzIHJlZ3VsYWVyZXIgQXVzZHJ1Y2tcbiAgICAgICAgICAgIC8vICdpJzoga2VpbmUgVW50ZXJzY2hlaWR1bmcgencuIEdyb3NzLSB1LiBLbGVpbnNjaHJlaWJ1bmdcbiAgICAgICAgICAgIC8vIE5JQ0hUIC8uLi4vLCB3ZWlsIGRhcyBNdXN0ZXIgdmFyaWFiZWwgc2VpbiBtdXNzXG4gICAgICAgICAgICAvLyBDQVZFQVQ6IEtFSU5FIFNFSFIgTEFOR0VOIFN0cmluZ3Mgd2cuIHJlZ3VsYWVyZW0gQXVzZHJ1Y2tcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWFnaWMtbnVtYmVyc1xuICAgICAgICAgICAgaWYgKHRpdGVsLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgZGJRdWVyeS50aXRlbCA9IG5ldyBSZWdFeHAodGl0ZWwsICdpdScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHNlY3VyaXR5L2RldGVjdC1ub24tbGl0ZXJhbC1yZWdleHBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHouQi4ge2phdmFzY3JpcHQ6IHRydWUsIHR5cGVzY3JpcHQ6IHRydWV9XG4gICAgICAgIGNvbnN0IHNjaGxhZ3dvZXJ0ZXIgPSBbXTtcbiAgICAgICAgaWYgKGphdmFzY3JpcHQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgc2NobGFnd29lcnRlci5wdXNoKCdKQVZBU0NSSVBUJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVzY3JpcHQgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgc2NobGFnd29lcnRlci5wdXNoKCdUWVBFU0NSSVBUJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGxhZ3dvZXJ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgZGJRdWVyeS5zY2hsYWd3b2VydGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGJRdWVyeS5zY2hsYWd3b2VydGVyID0gc2NobGFnd29lcnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaFNlcnZpY2UuZmluZCgpOiBkYlF1ZXJ5PSR7SlNPTjUuc3RyaW5naWZ5KGRiUXVlcnkpfWApO1xuXG4gICAgICAgIC8vIFBhdHRlcm4gXCJBY3RpdmUgUmVjb3JkXCIgKHVyc3BydWVuZ2wuIHZvbiBSdWJ5LW9uLVJhaWxzKVxuICAgICAgICAvLyBsZWVyZXMgQXJyYXksIGZhbGxzIG5pY2h0cyBnZWZ1bmRlbiB3aXJkXG4gICAgICAgIC8vIGxlYW4oKSBsaWVmZXJ0IGVpbiBcIlBsYWluIEphdmFTY3JpcHQgT2JqZWN0XCIgc3RhdHQgZWluIE1vbmdvb3NlIERvY3VtZW50XG4gICAgICAgIHJldHVybiBCdWNoTW9kZWwuZmluZChkYlF1ZXJ5KS5sZWFuPEJ1Y2hEYXRhPigpO1xuICAgICAgICAvLyBCdWNoLmZpbmRPbmUocXVlcnkpLCBmYWxscyBkYXMgU3VjaGtyaXRlcml1bSBlaW5kZXV0aWcgaXN0XG4gICAgICAgIC8vIGJlaSBmaW5kT25lKHF1ZXJ5KSB3aXJkIG51bGwgenVydWVja2dlbGllZmVydCwgZmFsbHMgbmljaHRzIGdlZnVuZGVuXG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlKGJ1Y2hEYXRhOiBCdWNoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9jay5jcmVhdGUoYnVjaERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLmNyZWF0ZSgpOiBidWNoRGF0YT0ke0pTT041LnN0cmluZ2lmeShidWNoRGF0YSl9YCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy52YWxpZGF0ZUNyZWF0ZShidWNoRGF0YSk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBCdWNoU2VydmljZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnVjaCA9IG5ldyBCdWNoTW9kZWwoYnVjaERhdGEpO1xuICAgICAgICBsZXQgYnVjaFNhdmVkITogRG9jdW1lbnQ7XG4gICAgICAgIC8vIGh0dHBzOi8vd3d3Lm1vbmdvZGIuY29tL2Jsb2cvcG9zdC9xdWljay1zdGFydC1ub2RlanMtLW1vbmdvZGItLWhvdy10by1pbXBsZW1lbnQtdHJhbnNhY3Rpb25zXG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzdGFydFNlc3Npb24oKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHNlc3Npb24ud2l0aFRyYW5zYWN0aW9uKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBidWNoU2F2ZWQgPSBhd2FpdCBidWNoLnNhdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICBgQnVjaFNlcnZpY2UuY3JlYXRlKCk6IERpZSBUcmFuc2FrdGlvbiB3dXJkZSBhYmdlYnJvY2hlbjogJHtKU09ONS5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gVE9ETyBbMjAzMC0wOS0zMF0gV2VpdGVyZSBGZWhsZXJiZWhhbmRsdW5nIGJlaSBSb2xsYmFja1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgc2Vzc2lvbi5lbmRTZXNzaW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnVjaERhdGFTYXZlZDogQnVjaERhdGEgPSBidWNoU2F2ZWQudG9PYmplY3QoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLmNyZWF0ZSgpOiBidWNoRGF0YVNhdmVkPSR7SlNPTjUuc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIGJ1Y2hEYXRhU2F2ZWQsXG4gICAgICAgICAgICApfWAsXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5zZW5kbWFpbChidWNoRGF0YVNhdmVkKTtcblxuICAgICAgICByZXR1cm4gYnVjaERhdGFTYXZlZDtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGUoYnVjaERhdGE6IEJ1Y2gsIHZlcnNpb25TdHI6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5tb2NrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vY2sudXBkYXRlKGJ1Y2hEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBCdWNoU2VydmljZS51cGRhdGUoKTogYnVjaERhdGE9JHtKU09ONS5zdHJpbmdpZnkoYnVjaERhdGEpfWAsXG4gICAgICAgICk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaFNlcnZpY2UudXBkYXRlKCk6IHZlcnNpb25TdHI9JHt2ZXJzaW9uU3RyfWApO1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlUmVzdWx0ID0gYXdhaXQgdGhpcy52YWxpZGF0ZVVwZGF0ZShidWNoRGF0YSwgdmVyc2lvblN0cik7XG4gICAgICAgIGlmICh2YWxpZGF0ZVJlc3VsdCBpbnN0YW5jZW9mIEJ1Y2hTZXJ2aWNlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZVJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmRCeUlkQW5kUmVwbGFjZSBlcnNldHp0IGVpbiBEb2N1bWVudCBtaXQgZ2dmLiB3ZW5pZ2VyIFByb3BlcnRpZXNcbiAgICAgICAgY29uc3QgYnVjaCA9IG5ldyBCdWNoTW9kZWwoYnVjaERhdGEpO1xuICAgICAgICBjb25zdCB1cGRhdGVPcHRpb25zID0geyBuZXc6IHRydWUgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgQnVjaE1vZGVsLmZpbmRCeUlkQW5kVXBkYXRlKFxuICAgICAgICAgICAgYnVjaC5faWQsXG4gICAgICAgICAgICBidWNoLFxuICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyxcbiAgICAgICAgKS5sZWFuPEJ1Y2hEYXRhPigpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1Y2hOb3RFeGlzdHMoYnVjaC5faWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5fX3YgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzdWx0Ll9fdisrO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaFNlcnZpY2UudXBkYXRlKCk6IHJlc3VsdD0ke0pTT041LnN0cmluZ2lmeShyZXN1bHQpfWApO1xuXG4gICAgICAgIC8vIFdlaXRlcmUgTWV0aG9kZW4gdm9uIG1vbmdvb3NlIHp1bSBBa3R1YWxpc2llcmVuOlxuICAgICAgICAvLyAgICBCdWNoLmZpbmRPbmVBbmRVcGRhdGUodXBkYXRlKVxuICAgICAgICAvLyAgICBidWNoLnVwZGF0ZShiZWRpbmd1bmcpXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICB9XG5cbiAgICBhc3luYyBkZWxldGUoaWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5tb2NrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vY2sucmVtb3ZlKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dnZXIuZGVidWcoYEJ1Y2hTZXJ2aWNlLmRlbGV0ZSgpOiBpZD0ke2lkfWApO1xuXG4gICAgICAgIC8vIERhcyBCdWNoIHp1ciBnZWdlYmVuZW4gSUQgYXN5bmNocm9uIGxvZXNjaGVuXG4gICAgICAgIGNvbnN0IHsgZGVsZXRlZENvdW50IH0gPSBhd2FpdCBCdWNoTW9kZWwuZGVsZXRlT25lKHsgX2lkOiBpZCB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBCdWNoU2VydmljZS5kZWxldGUoKTogZGVsZXRlZENvdW50PSR7ZGVsZXRlZENvdW50fWApO1xuICAgICAgICByZXR1cm4gZGVsZXRlZENvdW50ICE9PSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gV2VpdGVyZSBNZXRob2RlbiB2b24gbW9uZ29vc2UsIHVtIHp1IGxvZXNjaGVuOlxuICAgICAgICAvLyAgQnVjaC5maW5kQnlJZEFuZFJlbW92ZShpZClcbiAgICAgICAgLy8gIEJ1Y2guZmluZE9uZUFuZFJlbW92ZShiZWRpbmd1bmcpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZUNyZWF0ZShidWNoOiBCdWNoKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IHZhbGlkYXRlQnVjaChidWNoKTtcbiAgICAgICAgaWYgKG1zZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLnZhbGlkYXRlQ3JlYXRlKCk6IFZhbGlkYXRpb24gTWVzc2FnZTogJHtKU09ONS5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIG1zZyxcbiAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdWNoSW52YWxpZChtc2cpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhdHQgMiBzZXF1ZW50aWVsbGVuIERCLVp1Z3JpZmZlbiB3YWVyZSAxIERCLVp1Z3JpZmYgbWl0IE9SIGJlc3NlclxuXG4gICAgICAgIGNvbnN0IHJlc3VsdFRpdGVsID0gYXdhaXQgdGhpcy5jaGVja1RpdGVsRXhpc3RzKGJ1Y2gpO1xuICAgICAgICBpZiAocmVzdWx0VGl0ZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRpdGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0SXNibiA9IGF3YWl0IHRoaXMuY2hlY2tJc2JuRXhpc3RzKGJ1Y2gpO1xuICAgICAgICBpZiAocmVzdWx0SXNibiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0SXNibjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQnVjaFNlcnZpY2UudmFsaWRhdGVDcmVhdGUoKTogb2snKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNoZWNrVGl0ZWxFeGlzdHMoYnVjaDogQnVjaCkge1xuICAgICAgICBjb25zdCB7IHRpdGVsIH0gPSBidWNoO1xuXG4gICAgICAgIC8vIFBhdHRlcm4gXCJBY3RpdmUgUmVjb3JkXCIgKHVyc3BydWVuZ2wuIHZvbiBSdWJ5LW9uLVJhaWxzKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIGNvbnN0IHRtcElkID0gYXdhaXQgQnVjaE1vZGVsLmZpbmRPbmUoeyB0aXRlbCB9LCB7IF9pZDogdHJ1ZSB9KS5sZWFuPFxuICAgICAgICAgICAgc3RyaW5nXG4gICAgICAgID4oKTtcbiAgICAgICAgaWYgKHRtcElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLmNoZWNrVGl0ZWxFeGlzdHMoKTogX2lkPSR7SlNPTjUuc3RyaW5naWZ5KHRtcElkKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGl0ZWxFeGlzdHModGl0ZWwgYXMgc3RyaW5nLCB0bXBJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0J1Y2hTZXJ2aWNlLmNoZWNrVGl0ZWxFeGlzdHMoKTogb2snKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNoZWNrSXNibkV4aXN0cyhidWNoOiBCdWNoKSB7XG4gICAgICAgIGNvbnN0IHsgaXNibiB9ID0gYnVjaDtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBjb25zdCB0bXBJZCA9IGF3YWl0IEJ1Y2hNb2RlbC5maW5kT25lKHsgaXNibiB9LCB7IF9pZDogdHJ1ZSB9KS5sZWFuPFxuICAgICAgICAgICAgc3RyaW5nXG4gICAgICAgID4oKTtcblxuICAgICAgICBpZiAodG1wSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICBgQnVjaFNlcnZpY2UuY2hlY2tJc2JuRXhpc3RzKCk6IGJ1Y2g9JHtKU09ONS5zdHJpbmdpZnkodG1wSWQpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBJc2JuRXhpc3RzKGlzYm4gYXMgc3RyaW5nLCB0bXBJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0J1Y2hTZXJ2aWNlLmNoZWNrSXNibkV4aXN0cygpOiBvaycpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgc2VuZG1haWwoYnVjaERhdGE6IEJ1Y2hEYXRhKSB7XG4gICAgICAgIGlmIChzZXJ2ZXJDb25maWcuY2xvdWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gSW4gZGVyIENsb3VkIGthbm4gbWFuIHouQi4gXCJAc2VuZGdyaWQvbWFpbFwiIHN0YXR0XG4gICAgICAgICAgICAvLyBcIm5vZGVtYWlsZXJcIiBtaXQgbG9rYWxlbSBNYWlsc2VydmVyIHZlcndlbmRlblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZnJvbSA9ICdcIkpvZSBEb2VcIiA8Sm9lLkRvZUBhY21lLmNvbT4nO1xuICAgICAgICBjb25zdCB0byA9ICdcIkZvbyBCYXJcIiA8Rm9vLkJhckBhY21lLmNvbT4nO1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gYE5ldWVzIEJ1Y2ggJHtidWNoRGF0YS5faWR9YDtcbiAgICAgICAgY29uc3QgYm9keSA9IGBEYXMgQnVjaCBtaXQgZGVtIFRpdGVsIDxzdHJvbmc+JHtidWNoRGF0YS50aXRlbH08L3N0cm9uZz4gaXN0IGFuZ2VsZWd0YDtcblxuICAgICAgICBjb25zdCBkYXRhOiBTZW5kTWFpbE9wdGlvbnMgPSB7IGZyb20sIHRvLCBzdWJqZWN0LCBodG1sOiBib2R5IH07XG4gICAgICAgIGxvZ2dlci5kZWJ1Zyhgc2VuZE1haWwoKTogZGF0YSA9ICR7SlNPTjUuc3RyaW5naWZ5KGRhdGEpfWApO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBub2RlbWFpbGVyID0gYXdhaXQgaW1wb3J0KCdub2RlbWFpbGVyJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9lcy1zeW50YXhcbiAgICAgICAgICAgIGF3YWl0IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KG1haWxDb25maWcpLnNlbmRNYWlsKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICBgQnVjaFNlcnZpY2UuY3JlYXRlKCk6IEZlaGxlciBiZWltIFZlcnNjaGlja2VuIGRlciBFbWFpbDogJHtKU09ONS5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZVVwZGF0ZShidWNoOiBCdWNoRGF0YSwgdmVyc2lvblN0cjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmFsaWRhdGVWZXJzaW9uKHZlcnNpb25TdHIpO1xuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gcmVzdWx0O1xuICAgICAgICBsb2dnZXIuZGVidWcoYEJ1Y2hTZXJ2aWNlLnZhbGlkYXRlVXBkYXRlKCk6IHZlcnNpb249JHt2ZXJzaW9ufWApO1xuICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICBgQnVjaFNlcnZpY2UudmFsaWRhdGVVcGRhdGUoKTogYnVjaD0ke0pTT041LnN0cmluZ2lmeShidWNoKX1gLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nc2cgPSB2YWxpZGF0ZUJ1Y2goYnVjaCk7XG4gICAgICAgIGlmICh2YWxpZGF0aW9uTXNnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnVjaEludmFsaWQodmFsaWRhdGlvbk1zZyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHRUaXRlbCA9IGF3YWl0IHRoaXMuY2hlY2tUaXRlbEV4aXN0cyhidWNoKTtcbiAgICAgICAgaWYgKHJlc3VsdFRpdGVsICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0VGl0ZWwuaWQgIT09IGJ1Y2guX2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0VGl0ZWw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHRJZEFuZFZlcnNpb24gPSBhd2FpdCB0aGlzLmNoZWNrSWRBbmRWZXJzaW9uKFxuICAgICAgICAgICAgYnVjaC5faWQsXG4gICAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICApO1xuICAgICAgICBpZiAocmVzdWx0SWRBbmRWZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRJZEFuZFZlcnNpb247XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0J1Y2hTZXJ2aWNlLnZhbGlkYXRlVXBkYXRlKCk6IG9rJyk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVZlcnNpb24odmVyc2lvblN0cjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uU3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFZlcnNpb25JbnZhbGlkKHZlcnNpb25TdHIpO1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICAgIGBCdWNoU2VydmljZS52YWxpZGF0ZVZlcnNpb24oKTogVmVyc2lvbkludmFsaWQ9JHtKU09ONS5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gTnVtYmVyLnBhcnNlSW50KHZlcnNpb25TdHIsIDEwKTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTih2ZXJzaW9uKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgVmVyc2lvbkludmFsaWQodmVyc2lvblN0cik7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLnZhbGlkYXRlVmVyc2lvbigpOiBWZXJzaW9uSW52YWxpZD0ke0pTT041LnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY2hlY2tJZEFuZFZlcnNpb24oaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCwgdmVyc2lvbjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGJ1Y2hEYiA9IGF3YWl0IEJ1Y2hNb2RlbC5maW5kQnlJZChpZCkubGVhbjxCdWNoRGF0YT4oKTtcbiAgICAgICAgaWYgKGJ1Y2hEYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEJ1Y2hOb3RFeGlzdHMoaWQpO1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICAgIGBCdWNoU2VydmljZS5jaGVja0lkQW5kVmVyc2lvbigpOiBCdWNoTm90RXhpc3RzPSR7SlNPTjUuc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2ZXJzaW9uRGIgPSBidWNoRGIuX192ID8/IDA7XG4gICAgICAgIGlmICh2ZXJzaW9uIDwgdmVyc2lvbkRiKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVmVyc2lvbk91dGRhdGVkKGlkIGFzIHN0cmluZywgdmVyc2lvbik7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hTZXJ2aWNlLmNoZWNrSWRBbmRWZXJzaW9uKCk6IFZlcnNpb25PdXRkYXRlZD0ke0pTT041LnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIHJlcXVpcmUtYXdhaXQsIG5vLW51bGwvbm8tbnVsbCwgdW5pY29ybi9uby11c2VsZXNzLXVuZGVmaW5lZCAqL1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGluZXMgKi9cbiJdfQ==
"use strict";
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
exports.optimistic = exports.autoIndex = exports.connectDB = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-process-exit */
const mongoose_1 = require("mongoose");
const json5_1 = tslib_1.__importDefault(require("json5"));
const config_1 = require("../config");
const logger_1 = require("../logger");
// http://mongoosejs.com/docs/connections.html
// https://github.com/mongodb/node-mongodb-native
// https://docs.mongodb.com/manual/tutorial/configure-ssl-clients
const { atlas, url, tls, tlsCertificateKeyFile, mockDB } = config_1.dbConfig;
// bei "ESnext" statt "CommonJS": __dirname ist nicht vorhanden
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const filename = fileURLToPath(import.meta.url);
// const currentDir = dirname(filename);
// https://mongoosejs.com/docs/deprecations.html
const useNewUrlParser = true;
// findOneAndUpdate nutzt findOneAndUpdate() von MongoDB statt findAndModify()
const useFindAndModify = false;
// Mongoose nutzt createIndex() von MongoDB statt ensureIndex()
const useCreateIndex = true;
// MongoDB hat eine neue "Server Discover and Monitoring engine"
const useUnifiedTopology = true;
// Name eines mongoose-Models = Name der Collection
mongoose_1.pluralize(undefined); // eslint-disable-line unicorn/no-useless-undefined
// Callback: Start des Appservers, nachdem der DB-Server gestartet ist
const connectDB = async () => {
    if (mockDB) {
        logger_1.logger.warn('Mocking: Keine DB-Verbindung');
        return;
    }
    logger_1.logger.info(`URL fuer mongoose: ${url
        .replace(/\/\/.*:/u, '//USERNAME:@')
        .replace(/:[^:]*@/u, ':***@')}`);
    // Optionale Einstellungen, die nicht im Connection-String verwendbar sind
    // http://mongoosejs.com/docs/connections.html
    // http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html#.connect
    // https://mongodb.github.io/node-mongodb-native/3.5/reference/connecting/connection-settings
    const options = {
        useNewUrlParser,
        useFindAndModify,
        useCreateIndex,
        useUnifiedTopology,
    };
    if (!atlas && !tls) {
        options.tls = true;
        options.tlsCertificateKeyFile = tlsCertificateKeyFile;
        options.tlsInsecure = true;
    }
    // http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
    // http://mongoosejs.com/docs/api.html#connection_Connection-open
    // http://mongoosejs.com/docs/connections.html
    // https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
    // http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html
    try {
        await mongoose_1.connect(url, options);
    }
    catch (err) {
        logger_1.logger.error(`${json5_1.default.stringify(err)}`);
        logger_1.logger.error(`FEHLER beim Aufbau der DB-Verbindung: ${err.message}\n`);
        process.exit(0); // eslint-disable-line node/no-process-exit
    }
    logger_1.logger.info(`DB-Verbindung zu ${mongoose_1.connection.db.databaseName} ist aufgebaut`);
    // util.promisify(fn) funktioniert nur mit Funktionen, bei denen
    // der error-Callback das erste Funktionsargument ist
    mongoose_1.connection.on('disconnecting', () => logger_1.logger.info('DB-Verbindung wird geschlossen...'));
    mongoose_1.connection.on('disconnected', () => logger_1.logger.info('DB-Verbindung ist geschlossen.'));
    mongoose_1.connection.on('error', () => logger_1.logger.error('Fehlerhafte DB-Verbindung'));
};
exports.connectDB = connectDB;
// In Produktion auf false setzen
exports.autoIndex = true;
const optimistic = (schema) => {
    // https://mongoosejs.com/docs/guide.html#versionKey
    // https://github.com/Automattic/mongoose/issues/1265
    schema.pre('findOneAndUpdate', function () {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-invalid-this
        const update = this.getUpdate();
        // eslint-disable-next-line no-null/no-null
        if (update.__v !== null) {
            delete update.__v;
        }
        const keys = ['$set', '$setOnInsert'];
        for (const key of keys) {
            // Optional Chaining
            /* eslint-disable security/detect-object-injection */
            // eslint-disable-next-line no-null/no-null
            if (((_a = update[key]) === null || _a === void 0 ? void 0 : _a.__v) !== null) {
                delete update[key].__v;
                if (Object.entries(update[key]).length === 0) {
                    delete update[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
                }
            }
            /* eslint-enable security/detect-object-injection */
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-assignment
        update.$inc = update.$inc || {};
        update.$inc.__v = 1;
    });
};
exports.optimistic = optimistic;
/* eslint-enable no-process-exit */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdERCLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9kYi9jb25uZWN0REIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILG9DQUFvQztBQUVwQyx1Q0FBMEQ7QUFFMUQsMERBQTBCO0FBRTFCLHNDQUFxQztBQUNyQyxzQ0FBbUM7QUFFbkMsOENBQThDO0FBQzlDLGlEQUFpRDtBQUNqRCxpRUFBaUU7QUFFakUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxHQUFHLGlCQUFRLENBQUM7QUFFcEUsK0RBQStEO0FBQy9ELGtDQUFrQztBQUNsQyx1Q0FBdUM7QUFDdkMsbURBQW1EO0FBQ25ELHdDQUF3QztBQUV4QyxnREFBZ0Q7QUFDaEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBRTdCLDhFQUE4RTtBQUM5RSxNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUUvQiwrREFBK0Q7QUFDL0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBRTVCLGdFQUFnRTtBQUNoRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUVoQyxtREFBbUQ7QUFDbkQsb0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1EQUFtRDtBQUV6RSxzRUFBc0U7QUFFL0QsTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDaEMsSUFBSSxNQUFNLEVBQUU7UUFDUixlQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsT0FBTztLQUNWO0lBRUQsZUFBTSxDQUFDLElBQUksQ0FDUCxzQkFBc0IsR0FBRztTQUNwQixPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQztTQUNuQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQ3RDLENBQUM7SUFFRiww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QUksRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQTNCVyxRQUFBLFVBQVUsY0EyQnJCO0FBRUYsbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvY2Vzcy1leGl0ICovXG5cbmltcG9ydCB7IGNvbm5lY3QsIGNvbm5lY3Rpb24sIHBsdXJhbGl6ZSB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB0eXBlIHsgQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHR5cGUgeyBTY2hlbWEgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBkYkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xuXG4vLyBodHRwOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9jb25uZWN0aW9ucy5odG1sXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbW9uZ29kYi9ub2RlLW1vbmdvZGItbmF0aXZlXG4vLyBodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3R1dG9yaWFsL2NvbmZpZ3VyZS1zc2wtY2xpZW50c1xuXG5jb25zdCB7IGF0bGFzLCB1cmwsIHRscywgdGxzQ2VydGlmaWNhdGVLZXlGaWxlLCBtb2NrREIgfSA9IGRiQ29uZmlnO1xuXG4vLyBiZWkgXCJFU25leHRcIiBzdGF0dCBcIkNvbW1vbkpTXCI6IF9fZGlybmFtZSBpc3QgbmljaHQgdm9yaGFuZGVuXG4vLyBpbXBvcnQgeyBkaXJuYW1lIH0gZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcbi8vIGNvbnN0IGZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuLy8gY29uc3QgY3VycmVudERpciA9IGRpcm5hbWUoZmlsZW5hbWUpO1xuXG4vLyBodHRwczovL21vbmdvb3NlanMuY29tL2RvY3MvZGVwcmVjYXRpb25zLmh0bWxcbmNvbnN0IHVzZU5ld1VybFBhcnNlciA9IHRydWU7XG5cbi8vIGZpbmRPbmVBbmRVcGRhdGUgbnV0enQgZmluZE9uZUFuZFVwZGF0ZSgpIHZvbiBNb25nb0RCIHN0YXR0IGZpbmRBbmRNb2RpZnkoKVxuY29uc3QgdXNlRmluZEFuZE1vZGlmeSA9IGZhbHNlO1xuXG4vLyBNb25nb29zZSBudXR6dCBjcmVhdGVJbmRleCgpIHZvbiBNb25nb0RCIHN0YXR0IGVuc3VyZUluZGV4KClcbmNvbnN0IHVzZUNyZWF0ZUluZGV4ID0gdHJ1ZTtcblxuLy8gTW9uZ29EQiBoYXQgZWluZSBuZXVlIFwiU2VydmVyIERpc2NvdmVyIGFuZCBNb25pdG9yaW5nIGVuZ2luZVwiXG5jb25zdCB1c2VVbmlmaWVkVG9wb2xvZ3kgPSB0cnVlO1xuXG4vLyBOYW1lIGVpbmVzIG1vbmdvb3NlLU1vZGVscyA9IE5hbWUgZGVyIENvbGxlY3Rpb25cbnBsdXJhbGl6ZSh1bmRlZmluZWQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHVuaWNvcm4vbm8tdXNlbGVzcy11bmRlZmluZWRcblxuLy8gQ2FsbGJhY2s6IFN0YXJ0IGRlcyBBcHBzZXJ2ZXJzLCBuYWNoZGVtIGRlciBEQi1TZXJ2ZXIgZ2VzdGFydGV0IGlzdFxuXG5leHBvcnQgY29uc3QgY29ubmVjdERCID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChtb2NrREIpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ01vY2tpbmc6IEtlaW5lIERCLVZlcmJpbmR1bmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICBgVVJMIGZ1ZXIgbW9uZ29vc2U6ICR7dXJsXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwvLio6L3UsICcvL1VTRVJOQU1FOkAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzpbXjpdKkAvdSwgJzoqKipAJyl9YCxcbiAgICApO1xuXG4gICAgLy8gT3B0aW9uYWxlIEVpbnN0ZWxsdW5nZW4sIGRpZSBuaWNodCBpbSBDb25uZWN0aW9uLVN0cmluZyB2ZXJ3ZW5kYmFyIHNpbmRcbiAgICAvLyBodHRwOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9jb25uZWN0aW9ucy5odG1sXG4gICAgLy8gaHR0cDovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvMy41L2FwaS9Nb25nb0NsaWVudC5odG1sIy5jb25uZWN0XG4gICAgLy8gaHR0cHM6Ly9tb25nb2RiLmdpdGh1Yi5pby9ub2RlLW1vbmdvZGItbmF0aXZlLzMuNS9yZWZlcmVuY2UvY29ubmVjdGluZy9jb25uZWN0aW9uLXNldHRpbmdzXG4gICAgY29uc3Qgb3B0aW9uczogQ29ubmVjdGlvbk9wdGlvbnMgPSB7XG4gICAgICAgIHVzZU5ld1VybFBhcnNlcixcbiAgICAgICAgdXNlRmluZEFuZE1vZGlmeSxcbiAgICAgICAgdXNlQ3JlYXRlSW5kZXgsXG4gICAgICAgIHVzZVVuaWZpZWRUb3BvbG9neSxcbiAgICB9O1xuICAgIGlmICghYXRsYXMgJiYgIXRscykge1xuICAgICAgICBvcHRpb25zLnRscyA9IHRydWU7XG4gICAgICAgIG9wdGlvbnMudGxzQ2VydGlmaWNhdGVLZXlGaWxlID0gdGxzQ2VydGlmaWNhdGVLZXlGaWxlO1xuICAgICAgICBvcHRpb25zLnRsc0luc2VjdXJlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9hcGkuaHRtbCNpbmRleF9Nb25nb29zZS1jcmVhdGVDb25uZWN0aW9uXG4gICAgLy8gaHR0cDovL21vbmdvb3NlanMuY29tL2RvY3MvYXBpLmh0bWwjY29ubmVjdGlvbl9Db25uZWN0aW9uLW9wZW5cbiAgICAvLyBodHRwOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9jb25uZWN0aW9ucy5odG1sXG4gICAgLy8gaHR0cHM6Ly9kb2NzLm1vbmdvZGIuY29tL21hbnVhbC9yZWZlcmVuY2UvY29ubmVjdGlvbi1zdHJpbmcvI2Nvbm5lY3Rpb25zLWNvbm5lY3Rpb24tb3B0aW9uc1xuICAgIC8vIGh0dHA6Ly9tb25nb2RiLmdpdGh1Yi5pby9ub2RlLW1vbmdvZGItbmF0aXZlLzMuNS9hcGkvTW9uZ29DbGllbnQuaHRtbFxuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGNvbm5lY3QodXJsLCBvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBsb2dnZXIuZXJyb3IoYCR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCk7XG4gICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGBGRUhMRVIgYmVpbSBBdWZiYXUgZGVyIERCLVZlcmJpbmR1bmc6ICR7ZXJyLm1lc3NhZ2UgYXMgc3RyaW5nfVxcbmAsXG4gICAgICAgICk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBub2RlL25vLXByb2Nlc3MtZXhpdFxuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKGBEQi1WZXJiaW5kdW5nIHp1ICR7Y29ubmVjdGlvbi5kYi5kYXRhYmFzZU5hbWV9IGlzdCBhdWZnZWJhdXRgKTtcblxuICAgIC8vIHV0aWwucHJvbWlzaWZ5KGZuKSBmdW5rdGlvbmllcnQgbnVyIG1pdCBGdW5rdGlvbmVuLCBiZWkgZGVuZW5cbiAgICAvLyBkZXIgZXJyb3ItQ2FsbGJhY2sgZGFzIGVyc3RlIEZ1bmt0aW9uc2FyZ3VtZW50IGlzdFxuICAgIGNvbm5lY3Rpb24ub24oJ2Rpc2Nvbm5lY3RpbmcnLCAoKSA9PlxuICAgICAgICBsb2dnZXIuaW5mbygnREItVmVyYmluZHVuZyB3aXJkIGdlc2NobG9zc2VuLi4uJyksXG4gICAgKTtcbiAgICBjb25uZWN0aW9uLm9uKCdkaXNjb25uZWN0ZWQnLCAoKSA9PlxuICAgICAgICBsb2dnZXIuaW5mbygnREItVmVyYmluZHVuZyBpc3QgZ2VzY2hsb3NzZW4uJyksXG4gICAgKTtcbiAgICBjb25uZWN0aW9uLm9uKCdlcnJvcicsICgpID0+IGxvZ2dlci5lcnJvcignRmVobGVyaGFmdGUgREItVmVyYmluZHVuZycpKTtcbn07XG5cbi8vIEluIFByb2R1a3Rpb24gYXVmIGZhbHNlIHNldHplblxuZXhwb3J0IGNvbnN0IGF1dG9JbmRleCA9IHRydWU7XG5cbmV4cG9ydCBjb25zdCBvcHRpbWlzdGljID0gKHNjaGVtYTogU2NoZW1hKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9tb25nb29zZWpzLmNvbS9kb2NzL2d1aWRlLmh0bWwjdmVyc2lvbktleVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL21vbmdvb3NlL2lzc3Vlcy8xMjY1XG4gICAgc2NoZW1hLnByZSgnZmluZE9uZUFuZFVwZGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCxAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW52YWxpZC10aGlzXG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHRoaXMuZ2V0VXBkYXRlKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1udWxsL25vLW51bGxcbiAgICAgICAgaWYgKHVwZGF0ZS5fX3YgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB1cGRhdGUuX192O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXMgPSBbJyRzZXQnLCAnJHNldE9uSW5zZXJ0J107XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIC8vIE9wdGlvbmFsIENoYWluaW5nXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBzZWN1cml0eS9kZXRlY3Qtb2JqZWN0LWluamVjdGlvbiAqL1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW51bGwvbm8tbnVsbFxuICAgICAgICAgICAgaWYgKHVwZGF0ZVtrZXldPy5fX3YgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlW2tleV0uX192O1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZW50cmllcyh1cGRhdGVba2V5XSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB1cGRhdGVba2V5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZHluYW1pYy1kZWxldGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIHNlY3VyaXR5L2RldGVjdC1vYmplY3QtaW5qZWN0aW9uICovXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9zdHJpY3QtYm9vbGVhbi1leHByZXNzaW9ucywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgIHVwZGF0ZS4kaW5jID0gdXBkYXRlLiRpbmMgfHwge307XG4gICAgICAgIHVwZGF0ZS4kaW5jLl9fdiA9IDE7XG4gICAgfSk7XG59O1xuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXByb2Nlc3MtZXhpdCAqL1xuIl19
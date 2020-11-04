"use strict";
/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.BuchFileService = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("./errors");
const shared_1 = require("../../shared");
const entity_1 = require("../entity");
const mongodb_1 = require("mongodb");
const json5_1 = tslib_1.__importDefault(require("json5"));
const stream_1 = require("stream");
const shared_2 = require("../../shared");
/* eslint-disable unicorn/no-useless-undefined */
class BuchFileService {
    async save(id, buffer, contentType) {
        shared_2.logger.debug(`BuchFileService.save(): id = ${id}, contentType=${contentType}`);
        // Gibt es ein Buch zur angegebenen ID?
        const buch = await entity_1.BuchModel.findById(id);
        // eslint-disable-next-line no-null/no-null
        if (buch === null) {
            return false;
        }
        const { db, client } = await shared_1.connectMongoDB();
        const bucket = new mongodb_1.GridFSBucket(db);
        await this.deleteFiles(id, bucket);
        // https://stackoverflow.com/questions/13230487/converting-a-buffer-into-a-readablestream-in-node-js#answer-44091532
        const readable = new stream_1.Readable();
        // _read ist erforderlich, kann die leere Funktion sein
        readable._read = () => { }; // eslint-disable-line no-underscore-dangle,no-empty-function
        readable.push(buffer);
        readable.push(null); // eslint-disable-line no-null/no-null,unicorn/no-null
        const metadata = { contentType };
        shared_1.saveReadable(readable, bucket, id, { metadata }, client);
        return true;
    }
    async find(filename) {
        shared_2.logger.debug(`BuchFileService.findFile(): filename=${filename}`);
        const resultCheck = await this.checkFilename(filename);
        if (resultCheck !== undefined) {
            return resultCheck;
        }
        const { db, client } = await shared_1.connectMongoDB();
        // https://mongodb.github.io/node-mongodb-native/3.5/tutorials/gridfs/streaming
        const bucket = new mongodb_1.GridFSBucket(db);
        const resultContentType = await this.getContentType(filename, bucket);
        if (typeof resultContentType !== 'string') {
            return resultContentType;
        }
        const contentType = resultContentType;
        // https://mongodb.github.io/node-mongodb-native/3.5/tutorials/gridfs/streaming/#downloading-a-file
        // https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93
        const readStream = bucket
            .openDownloadStreamByName(filename)
            .on('end', () => shared_1.closeMongoDBClient(client));
        return { readStream, contentType };
    }
    async deleteFiles(filename, bucket) {
        shared_2.logger.debug(`BuchFileService.deleteFiles(): filename=${filename}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/naming-convention
        const idObjects = await bucket
            .find({ filename })
            .project({ _id: 1 }) // eslint-disable-line @typescript-eslint/naming-convention
            .toArray();
        const ids = idObjects.map((obj) => obj._id);
        shared_2.logger.debug(`BuchFileService.deleteFiles(): ids=${json5_1.default.stringify(ids)}`);
        ids.forEach((fileId) => bucket.delete(fileId, () => shared_2.logger.debug(`BuchFileService.deleteFiles(): geloeschte ID=${json5_1.default.stringify(fileId)}`)));
    }
    async checkFilename(filename) {
        shared_2.logger.debug(`BuchFileService.checkFilename(): filename=${filename}`);
        // Gibt es ein Buch mit dem gegebenen "filename" als ID?
        const buch = await entity_1.BuchModel.findById(filename);
        // eslint-disable-next-line no-null/no-null
        if (buch === null) {
            const result = new errors_1.BuchNotExists(filename);
            shared_2.logger.debug(`BuchFileService.checkFilename(): BuchNotExists=${json5_1.default.stringify(result)}`);
            return result;
        }
        shared_2.logger.debug(`BuchFileService.checkFilename(): buch=${json5_1.default.stringify(buch)}`);
        return undefined;
    }
    async getContentType(filename, bucket) {
        let files;
        try {
            files = await bucket.find({ filename }).toArray(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        }
        catch (err) {
            shared_2.logger.error(`${json5_1.default.stringify(err)}`);
            files = [];
        }
        switch (files.length) {
            case 0: {
                const error = new errors_1.FileNotFound(filename);
                shared_2.logger.debug(`BuchFileService.getContentType(): FileNotFound=${json5_1.default.stringify(error)}`);
                return error;
            }
            case 1: {
                const [file] = files;
                const { contentType } = file.metadata;
                shared_2.logger.debug(`BuchFileService.getContentType(): contentType=${contentType}`);
                return contentType;
            }
            default: {
                const error = new errors_1.MultipleFiles(filename);
                shared_2.logger.debug(`BuchFileService.getContentType(): MultipleFiles=${json5_1.default.stringify(error)}`);
                return new errors_1.MultipleFiles(filename);
            }
        }
    }
}
exports.BuchFileService = BuchFileService;
/* eslint-enable unicorn/no-useless-undefined */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC1maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVjaC9zZXJ2aWNlL2J1Y2gtZmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7QUFFSCxxQ0FBc0U7QUFDdEUseUNBQWdGO0FBQ2hGLHNDQUFzQztBQUN0QyxxQ0FBdUM7QUFDdkMsMERBQTBCO0FBRTFCLG1DQUFrQztBQUNsQyx5Q0FBc0M7QUFFdEMsaURBQWlEO0FBQ2pELE1BQWEsZUFBZTtJQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVUsRUFBRSxNQUFjLEVBQUUsV0FBK0I7UUFDbEUsZUFBTSxDQUFDLEtBQUssQ0FDUixnQ0FBZ0MsRUFBRSxpQkFBaUIsV0FBVyxFQUFFLENBQ25FLENBQUM7UUFFRix1Q0FBdUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQywyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sdUJBQWMsRUFBRSxDQUFDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRW5DLG9IQUFvSDtRQUNwSCxNQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUNoQyx1REFBdUQ7UUFDdkQsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7UUFDeEYsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsc0RBQXNEO1FBRTNFLE1BQU0sUUFBUSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDakMscUJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQWdCO1FBQ3ZCLGVBQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUMzQixPQUFPLFdBQVcsQ0FBQztTQUN0QjtRQUVELE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSx1QkFBYyxFQUFFLENBQUM7UUFFOUMsK0VBQStFO1FBQy9FLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxPQUFPLGlCQUFpQixLQUFLLFFBQVEsRUFBRTtZQUN2QyxPQUFPLGlCQUFpQixDQUFDO1NBQzVCO1FBRUQsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7UUFDdEMsbUdBQW1HO1FBQ25HLDZGQUE2RjtRQUM3RixNQUFNLFVBQVUsR0FBRyxNQUFNO2FBQ3BCLHdCQUF3QixDQUFDLFFBQVEsQ0FBQzthQUNsQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLDJCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFnQixFQUFFLE1BQW9CO1FBQzVELGVBQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEUseUdBQXlHO1FBQ3pHLE1BQU0sU0FBUyxHQUF3QixNQUFNLE1BQU07YUFDOUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDbEIsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsMkRBQTJEO2FBQy9FLE9BQU8sRUFBRSxDQUFDO1FBQ2YsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLGVBQU0sQ0FBQyxLQUFLLENBQ1Isc0NBQXNDLGVBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDL0QsQ0FBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FDdkIsZUFBTSxDQUFDLEtBQUssQ0FDUixnREFBZ0QsZUFBSyxDQUFDLFNBQVMsQ0FDM0QsTUFBTSxDQUNULEVBQUUsQ0FDTixDQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQWdCO1FBQ3hDLGVBQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFdEUsd0RBQXdEO1FBQ3hELE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtZQUNmLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxlQUFNLENBQUMsS0FBSyxDQUNSLGtEQUFrRCxlQUFLLENBQUMsU0FBUyxDQUM3RCxNQUFNLENBQ1QsRUFBRSxDQUNOLENBQUM7WUFDRixPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUVELGVBQU0sQ0FBQyxLQUFLLENBQ1IseUNBQXlDLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDbkUsQ0FBQztRQUVGLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQWdCLEVBQUUsTUFBb0I7UUFDL0QsSUFBSSxLQUE4QyxDQUFDO1FBQ25ELElBQUk7WUFDQSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLDhEQUE4RDtTQUNwSDtRQUFDLE9BQU8sR0FBWSxFQUFFO1lBQ25CLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFFRCxRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDbEIsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDSixNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLGVBQU0sQ0FBQyxLQUFLLENBQ1Isa0RBQWtELGVBQUssQ0FBQyxTQUFTLENBQzdELEtBQUssQ0FDUixFQUFFLENBQ04sQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDckIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUMvRCxlQUFNLENBQUMsS0FBSyxDQUNSLGlEQUFpRCxXQUFXLEVBQUUsQ0FDakUsQ0FBQztnQkFDRixPQUFPLFdBQVcsQ0FBQzthQUN0QjtZQUVELE9BQU8sQ0FBQyxDQUFDO2dCQUNMLE1BQU0sS0FBSyxHQUFHLElBQUksc0JBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUMsZUFBTSxDQUFDLEtBQUssQ0FDUixtREFBbUQsZUFBSyxDQUFDLFNBQVMsQ0FDOUQsS0FBSyxDQUNSLEVBQUUsQ0FDTixDQUFDO2dCQUNGLE9BQU8sSUFBSSxzQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7QUEzSUQsMENBMklDO0FBRUQsZ0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNyAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgQnVjaE5vdEV4aXN0cywgRmlsZU5vdEZvdW5kLCBNdWx0aXBsZUZpbGVzIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgY2xvc2VNb25nb0RCQ2xpZW50LCBjb25uZWN0TW9uZ29EQiwgc2F2ZVJlYWRhYmxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IEJ1Y2hNb2RlbCB9IGZyb20gJy4uL2VudGl0eSc7XG5pbXBvcnQgeyBHcmlkRlNCdWNrZXQgfSBmcm9tICdtb25nb2RiJztcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5pbXBvcnQgdHlwZSB7IE9iamVjdElkIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSB1bmljb3JuL25vLXVzZWxlc3MtdW5kZWZpbmVkICovXG5leHBvcnQgY2xhc3MgQnVjaEZpbGVTZXJ2aWNlIHtcbiAgICBhc3luYyBzYXZlKGlkOiBzdHJpbmcsIGJ1ZmZlcjogQnVmZmVyLCBjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBCdWNoRmlsZVNlcnZpY2Uuc2F2ZSgpOiBpZCA9ICR7aWR9LCBjb250ZW50VHlwZT0ke2NvbnRlbnRUeXBlfWAsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gR2lidCBlcyBlaW4gQnVjaCB6dXIgYW5nZWdlYmVuZW4gSUQ/XG4gICAgICAgIGNvbnN0IGJ1Y2ggPSBhd2FpdCBCdWNoTW9kZWwuZmluZEJ5SWQoaWQpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbnVsbC9uby1udWxsXG4gICAgICAgIGlmIChidWNoID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGRiLCBjbGllbnQgfSA9IGF3YWl0IGNvbm5lY3RNb25nb0RCKCk7XG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBHcmlkRlNCdWNrZXQoZGIpO1xuICAgICAgICBhd2FpdCB0aGlzLmRlbGV0ZUZpbGVzKGlkLCBidWNrZXQpO1xuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzMjMwNDg3L2NvbnZlcnRpbmctYS1idWZmZXItaW50by1hLXJlYWRhYmxlc3RyZWFtLWluLW5vZGUtanMjYW5zd2VyLTQ0MDkxNTMyXG4gICAgICAgIGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlKCk7XG4gICAgICAgIC8vIF9yZWFkIGlzdCBlcmZvcmRlcmxpY2gsIGthbm4gZGllIGxlZXJlIEZ1bmt0aW9uIHNlaW5cbiAgICAgICAgcmVhZGFibGUuX3JlYWQgPSAoKSA9PiB7fTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSxuby1lbXB0eS1mdW5jdGlvblxuICAgICAgICByZWFkYWJsZS5wdXNoKGJ1ZmZlcik7XG4gICAgICAgIHJlYWRhYmxlLnB1c2gobnVsbCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbnVsbC9uby1udWxsLHVuaWNvcm4vbm8tbnVsbFxuXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0geyBjb250ZW50VHlwZSB9O1xuICAgICAgICBzYXZlUmVhZGFibGUocmVhZGFibGUsIGJ1Y2tldCwgaWQsIHsgbWV0YWRhdGEgfSwgY2xpZW50KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZChmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaEZpbGVTZXJ2aWNlLmZpbmRGaWxlKCk6IGZpbGVuYW1lPSR7ZmlsZW5hbWV9YCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdENoZWNrID0gYXdhaXQgdGhpcy5jaGVja0ZpbGVuYW1lKGZpbGVuYW1lKTtcbiAgICAgICAgaWYgKHJlc3VsdENoZWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRDaGVjaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgZGIsIGNsaWVudCB9ID0gYXdhaXQgY29ubmVjdE1vbmdvREIoKTtcblxuICAgICAgICAvLyBodHRwczovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvMy41L3R1dG9yaWFscy9ncmlkZnMvc3RyZWFtaW5nXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBHcmlkRlNCdWNrZXQoZGIpO1xuICAgICAgICBjb25zdCByZXN1bHRDb250ZW50VHlwZSA9IGF3YWl0IHRoaXMuZ2V0Q29udGVudFR5cGUoZmlsZW5hbWUsIGJ1Y2tldCk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0Q29udGVudFR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Q29udGVudFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3VsdENvbnRlbnRUeXBlO1xuICAgICAgICAvLyBodHRwczovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvMy41L3R1dG9yaWFscy9ncmlkZnMvc3RyZWFtaW5nLyNkb3dubG9hZGluZy1hLWZpbGVcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cuZnJlZWNvZGVjYW1wLm9yZy9uZXdzL25vZGUtanMtc3RyZWFtcy1ldmVyeXRoaW5nLXlvdS1uZWVkLXRvLWtub3ctYzkxNDEzMDZiZTkzXG4gICAgICAgIGNvbnN0IHJlYWRTdHJlYW0gPSBidWNrZXRcbiAgICAgICAgICAgIC5vcGVuRG93bmxvYWRTdHJlYW1CeU5hbWUoZmlsZW5hbWUpXG4gICAgICAgICAgICAub24oJ2VuZCcsICgpID0+IGNsb3NlTW9uZ29EQkNsaWVudChjbGllbnQpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVhZFN0cmVhbSwgY29udGVudFR5cGUgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGRlbGV0ZUZpbGVzKGZpbGVuYW1lOiBzdHJpbmcsIGJ1Y2tldDogR3JpZEZTQnVja2V0KSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaEZpbGVTZXJ2aWNlLmRlbGV0ZUZpbGVzKCk6IGZpbGVuYW1lPSR7ZmlsZW5hbWV9YCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnQsIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBjb25zdCBpZE9iamVjdHM6IHsgX2lkOiBPYmplY3RJZCB9W10gPSBhd2FpdCBidWNrZXRcbiAgICAgICAgICAgIC5maW5kKHsgZmlsZW5hbWUgfSlcbiAgICAgICAgICAgIC5wcm9qZWN0KHsgX2lkOiAxIH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgICAgICAudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBpZHMgPSBpZE9iamVjdHMubWFwKChvYmopID0+IG9iai5faWQpO1xuICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICBgQnVjaEZpbGVTZXJ2aWNlLmRlbGV0ZUZpbGVzKCk6IGlkcz0ke0pTT041LnN0cmluZ2lmeShpZHMpfWAsXG4gICAgICAgICk7XG4gICAgICAgIGlkcy5mb3JFYWNoKChmaWxlSWQpID0+XG4gICAgICAgICAgICBidWNrZXQuZGVsZXRlKGZpbGVJZCwgKCkgPT5cbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgICAgIGBCdWNoRmlsZVNlcnZpY2UuZGVsZXRlRmlsZXMoKTogZ2Vsb2VzY2h0ZSBJRD0ke0pTT041LnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgY2hlY2tGaWxlbmFtZShmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaEZpbGVTZXJ2aWNlLmNoZWNrRmlsZW5hbWUoKTogZmlsZW5hbWU9JHtmaWxlbmFtZX1gKTtcblxuICAgICAgICAvLyBHaWJ0IGVzIGVpbiBCdWNoIG1pdCBkZW0gZ2VnZWJlbmVuIFwiZmlsZW5hbWVcIiBhbHMgSUQ/XG4gICAgICAgIGNvbnN0IGJ1Y2ggPSBhd2FpdCBCdWNoTW9kZWwuZmluZEJ5SWQoZmlsZW5hbWUpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbnVsbC9uby1udWxsXG4gICAgICAgIGlmIChidWNoID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQnVjaE5vdEV4aXN0cyhmaWxlbmFtZSk7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hGaWxlU2VydmljZS5jaGVja0ZpbGVuYW1lKCk6IEJ1Y2hOb3RFeGlzdHM9JHtKU09ONS5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBCdWNoRmlsZVNlcnZpY2UuY2hlY2tGaWxlbmFtZSgpOiBidWNoPSR7SlNPTjUuc3RyaW5naWZ5KGJ1Y2gpfWAsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGdldENvbnRlbnRUeXBlKGZpbGVuYW1lOiBzdHJpbmcsIGJ1Y2tldDogR3JpZEZTQnVja2V0KSB7XG4gICAgICAgIGxldCBmaWxlczogeyBtZXRhZGF0YTogeyBjb250ZW50VHlwZTogc3RyaW5nIH0gfVtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlsZXMgPSBhd2FpdCBidWNrZXQuZmluZCh7IGZpbGVuYW1lIH0pLnRvQXJyYXkoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcbiAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYCR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCk7XG4gICAgICAgICAgICBmaWxlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEZpbGVOb3RGb3VuZChmaWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICAgICAgICBgQnVjaEZpbGVTZXJ2aWNlLmdldENvbnRlbnRUeXBlKCk6IEZpbGVOb3RGb3VuZD0ke0pTT041LnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgMToge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtmaWxlXSA9IGZpbGVzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudFR5cGUgfTogeyBjb250ZW50VHlwZTogc3RyaW5nIH0gPSBmaWxlLm1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICAgICAgYEJ1Y2hGaWxlU2VydmljZS5nZXRDb250ZW50VHlwZSgpOiBjb250ZW50VHlwZT0ke2NvbnRlbnRUeXBlfWAsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudFR5cGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBNdWx0aXBsZUZpbGVzKGZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgICAgIGBCdWNoRmlsZVNlcnZpY2UuZ2V0Q29udGVudFR5cGUoKTogTXVsdGlwbGVGaWxlcz0ke0pTT041LnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICAgICApfWAsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE11bHRpcGxlRmlsZXMoZmlsZW5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKiBlc2xpbnQtZW5hYmxlIHVuaWNvcm4vbm8tdXNlbGVzcy11bmRlZmluZWQgKi9cbiJdfQ==
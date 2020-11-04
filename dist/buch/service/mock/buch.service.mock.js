"use strict";
/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.BuchServiceMock = void 0;
const tslib_1 = require("tslib");
const buch_1 = require("./buch");
const json5_1 = tslib_1.__importDefault(require("json5"));
const shared_1 = require("../../../shared");
const uuid_1 = require("uuid");
/* eslint-disable @typescript-eslint/no-unused-vars,require-await,@typescript-eslint/require-await */
class BuchServiceMock {
    async findById(id) {
        buch_1.buch._id = id;
        return buch_1.buch;
    }
    async find(_) {
        return buch_1.buecher;
    }
    async create(buchData) {
        buchData._id = uuid_1.v4();
        shared_1.logger.info(`Neues Buch: ${json5_1.default.stringify(buchData)}`);
        return buchData;
    }
    async update(buchData) {
        if (buchData.__v !== undefined) {
            buchData.__v++;
        }
        shared_1.logger.info(`Aktualisiertes Buch: ${json5_1.default.stringify(buchData)}`);
        return Promise.resolve(buchData);
    }
    async remove(id) {
        shared_1.logger.info(`ID des geloeschten Buches: ${id}`);
        return true;
    }
}
exports.BuchServiceMock = BuchServiceMock;
/* eslint-enable @typescript-eslint/no-unused-vars,require-await,@typescript-eslint/require-await */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC5zZXJ2aWNlLm1vY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnVjaC9zZXJ2aWNlL21vY2svYnVjaC5zZXJ2aWNlLm1vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILGlDQUF1QztBQUV2QywwREFBMEI7QUFDMUIsNENBQXlDO0FBQ3pDLCtCQUFrQztBQUVsQyxxR0FBcUc7QUFDckcsTUFBYSxlQUFlO0lBQ3hCLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBVTtRQUNyQixXQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sV0FBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQVc7UUFDbEIsT0FBTyxjQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBYztRQUN2QixRQUFRLENBQUMsR0FBRyxHQUFHLFNBQUksRUFBRSxDQUFDO1FBQ3RCLGVBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxlQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFjO1FBQ3ZCLElBQUksUUFBUSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsZUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsZUFBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDbkIsZUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE1QkQsMENBNEJDO0FBRUQsb0dBQW9HIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOCAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgYnVjaCwgYnVlY2hlciB9IGZyb20gJy4vYnVjaCc7XG5pbXBvcnQgdHlwZSB7IEJ1Y2ggfSBmcm9tICcuLi8uLi9lbnRpdHknO1xuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyxyZXF1aXJlLWF3YWl0LEB0eXBlc2NyaXB0LWVzbGludC9yZXF1aXJlLWF3YWl0ICovXG5leHBvcnQgY2xhc3MgQnVjaFNlcnZpY2VNb2NrIHtcbiAgICBhc3luYyBmaW5kQnlJZChpZDogc3RyaW5nKSB7XG4gICAgICAgIGJ1Y2guX2lkID0gaWQ7XG4gICAgICAgIHJldHVybiBidWNoO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbmQoXz86IHVua25vd24pIHtcbiAgICAgICAgcmV0dXJuIGJ1ZWNoZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlKGJ1Y2hEYXRhOiBCdWNoKSB7XG4gICAgICAgIGJ1Y2hEYXRhLl9pZCA9IHV1aWQoKTtcbiAgICAgICAgbG9nZ2VyLmluZm8oYE5ldWVzIEJ1Y2g6ICR7SlNPTjUuc3RyaW5naWZ5KGJ1Y2hEYXRhKX1gKTtcbiAgICAgICAgcmV0dXJuIGJ1Y2hEYXRhO1xuICAgIH1cblxuICAgIGFzeW5jIHVwZGF0ZShidWNoRGF0YTogQnVjaCkge1xuICAgICAgICBpZiAoYnVjaERhdGEuX192ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJ1Y2hEYXRhLl9fdisrO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5pbmZvKGBBa3R1YWxpc2llcnRlcyBCdWNoOiAke0pTT041LnN0cmluZ2lmeShidWNoRGF0YSl9YCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYnVjaERhdGEpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbW92ZShpZDogc3RyaW5nKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBJRCBkZXMgZ2Vsb2VzY2h0ZW4gQnVjaGVzOiAke2lkfWApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzLHJlcXVpcmUtYXdhaXQsQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXQgKi9cbiJdfQ==
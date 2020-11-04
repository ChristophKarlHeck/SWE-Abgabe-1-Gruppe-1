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
exports.closeMongoDBClient = exports.connectMongoDB = void 0;
const tslib_1 = require("tslib");
const json5_1 = tslib_1.__importDefault(require("json5"));
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const logger_1 = require("../../shared/logger");
const connectMongoDB = async () => {
    const { atlas, dbName, url, tlsCertificateKeyFile } = db_1.dbConfig;
    logger_1.logger.debug(`mongodb.connectMongoDB(): url=${url}`);
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    if (!atlas) {
        options.tls = true;
        options.tlsCertificateKeyFile = tlsCertificateKeyFile;
        options.tlsInsecure = true;
    }
    const client = new mongodb_1.MongoClient(url, options);
    await client.connect();
    logger_1.logger.debug('mongodb.connectMongoDB(): DB-Client geoeffnet');
    const db = client.db(dbName);
    return { db, client };
};
exports.connectMongoDB = connectMongoDB;
// NICHT: async, weil die Funktion fuer Request-Events beim Hochladen und
// fuer GridFS-Events beim Herunterladen verwendet wird
const closeMongoDBClient = (client) => {
    // IIFE (= Immediately Invoked Function Expression) wegen await
    // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    // https://github.com/typescript-eslint/typescript-eslint/issues/647
    // https://github.com/typescript-eslint/typescript-eslint/pull/1799
    (async () => {
        try {
            await client.close();
        }
        catch (err) {
            logger_1.logger.error(`mongodb.closeDbClient(): ${json5_1.default.stringify(err)}`);
            return;
        }
        logger_1.logger.debug('mongodb.closeDbClient(): DB-Client wurde geschlossen');
    })();
};
exports.closeMongoDBClient = closeMongoDBClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29EQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvZGIvbW9uZ29EQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgsMERBQTBCO0FBQzFCLHFDQUFzQztBQUV0QyxxQ0FBd0M7QUFDeEMsZ0RBQTZDO0FBRXRDLE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3JDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxHQUFHLGFBQVEsQ0FBQztJQUMvRCxlQUFNLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sT0FBTyxHQUF1QjtRQUNoQyxlQUFlLEVBQUUsSUFBSTtRQUNyQixrQkFBa0IsRUFBRSxJQUFJO0tBQzNCLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDbkIsT0FBTyxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO1FBQ3RELE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQzlCO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBVyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixlQUFNLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDOUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QixPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQW5CVyxRQUFBLGNBQWMsa0JBbUJ6QjtBQUVGLHlFQUF5RTtBQUN6RSx1REFBdUQ7QUFDaEQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE1BQW1CLEVBQVEsRUFBRTtJQUM1RCwrREFBK0Q7SUFDL0QseURBQXlEO0lBQ3pELG9FQUFvRTtJQUNwRSxtRUFBbUU7SUFDbkUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNSLElBQUk7WUFDQSxNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtRQUFDLE9BQU8sR0FBWSxFQUFFO1lBQ25CLGVBQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLGVBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLE9BQU87U0FDVjtRQUVELGVBQU0sQ0FBQyxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUN6RSxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBZlcsUUFBQSxrQkFBa0Isc0JBZTdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNyAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcbmltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgdHlwZSB7IE1vbmdvQ2xpZW50T3B0aW9ucyB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgZGJDb25maWcgfSBmcm9tICcuLi9jb25maWcvZGInO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBjb25uZWN0TW9uZ29EQiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGF0bGFzLCBkYk5hbWUsIHVybCwgdGxzQ2VydGlmaWNhdGVLZXlGaWxlIH0gPSBkYkNvbmZpZztcbiAgICBsb2dnZXIuZGVidWcoYG1vbmdvZGIuY29ubmVjdE1vbmdvREIoKTogdXJsPSR7dXJsfWApO1xuICAgIGNvbnN0IG9wdGlvbnM6IE1vbmdvQ2xpZW50T3B0aW9ucyA9IHtcbiAgICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXG4gICAgfTtcbiAgICBpZiAoIWF0bGFzKSB7XG4gICAgICAgIG9wdGlvbnMudGxzID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy50bHNDZXJ0aWZpY2F0ZUtleUZpbGUgPSB0bHNDZXJ0aWZpY2F0ZUtleUZpbGU7XG4gICAgICAgIG9wdGlvbnMudGxzSW5zZWN1cmUgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmwsIG9wdGlvbnMpO1xuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XG4gICAgbG9nZ2VyLmRlYnVnKCdtb25nb2RiLmNvbm5lY3RNb25nb0RCKCk6IERCLUNsaWVudCBnZW9lZmZuZXQnKTtcbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYihkYk5hbWUpO1xuXG4gICAgcmV0dXJuIHsgZGIsIGNsaWVudCB9O1xufTtcblxuLy8gTklDSFQ6IGFzeW5jLCB3ZWlsIGRpZSBGdW5rdGlvbiBmdWVyIFJlcXVlc3QtRXZlbnRzIGJlaW0gSG9jaGxhZGVuIHVuZFxuLy8gZnVlciBHcmlkRlMtRXZlbnRzIGJlaW0gSGVydW50ZXJsYWRlbiB2ZXJ3ZW5kZXQgd2lyZFxuZXhwb3J0IGNvbnN0IGNsb3NlTW9uZ29EQkNsaWVudCA9IChjbGllbnQ6IE1vbmdvQ2xpZW50KTogdm9pZCA9PiB7XG4gICAgLy8gSUlGRSAoPSBJbW1lZGlhdGVseSBJbnZva2VkIEZ1bmN0aW9uIEV4cHJlc3Npb24pIHdlZ2VuIGF3YWl0XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HbG9zc2FyeS9JSUZFXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzY3JpcHQtZXNsaW50L3R5cGVzY3JpcHQtZXNsaW50L2lzc3Vlcy82NDdcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHlwZXNjcmlwdC1lc2xpbnQvdHlwZXNjcmlwdC1lc2xpbnQvcHVsbC8xNzk5XG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgbW9uZ29kYi5jbG9zZURiQ2xpZW50KCk6ICR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ21vbmdvZGIuY2xvc2VEYkNsaWVudCgpOiBEQi1DbGllbnQgd3VyZGUgZ2VzY2hsb3NzZW4nKTtcbiAgICB9KSgpO1xufTtcbiJdfQ==
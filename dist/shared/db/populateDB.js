"use strict";
/*
 * Copyright (C) 2020 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.populateDB = void 0;
const config_1 = require("./../config");
const mongodb_1 = require("mongodb");
const buecher_1 = require("./buecher");
const mongoDB_1 = require("./mongoDB");
const fs_1 = require("fs");
const logger_1 = require("../logger");
const path_1 = require("path");
const gridfs_1 = require("./gridfs");
const createCollection = async (db) => {
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Db.html#dropCollection
    const collectionName = 'Buch';
    logger_1.logger.warn(`Die Collection "${collectionName}" wird geloescht...`);
    let dropped = false;
    try {
        dropped = await db.dropCollection(collectionName);
    }
    catch (err) {
        // Falls der Error *NICHT* durch eine fehlende Collection verursacht wurde
        if (err.name !== 'MongoError') {
            logger_1.logger.error(`Fehler beim Neuladen der DB ${db.databaseName}`);
            return;
        }
    }
    if (dropped) {
        logger_1.logger.warn(`Die Collection "${collectionName}" wurde geloescht.`);
    }
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Db.html#createCollection
    logger_1.logger.warn(`Die Collection "${collectionName}" wird neu angelegt...`);
    const collection = await db.createCollection(collectionName);
    logger_1.logger.warn(`Die Collection "${collection.collectionName}" wurde neu angelegt.`);
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#insertMany
    const result = await collection.insertMany(buecher_1.buecher);
    logger_1.logger.warn(`${result.insertedCount} Datensaetze wurden eingefuegt.`);
    return collection;
};
const createIndex = async (collection) => {
    logger_1.logger.warn(`Indexe fuer "${collection.collectionName}" werden neu angelegt...`);
    // http://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#createIndex
    // Beachte: bei createIndexes() gelten die Optionen fuer alle Indexe
    let index = await collection.createIndex('titel', { unique: true });
    logger_1.logger.warn(`Der Index ${index} wurde angelegt.`);
    index = await collection.createIndex('isbn', { unique: true });
    logger_1.logger.warn(`Der Index ${index} wurde angelegt.`);
    index = await collection.createIndex('schlagwoerter', { sparse: true });
    logger_1.logger.warn(`Der Index ${index} wurde angelegt.`);
};
const uploadBinary = (db, client) => {
    // Kein File-Upload in die Cloud
    if (config_1.serverConfig.cloud !== undefined) {
        logger_1.logger.info('uploadBinary(): Keine Binaerdateien mit der Cloud');
        return;
    }
    const filenameBinary = 'image.png';
    const contentType = 'image/png';
    const filename = '00000000-0000-0000-0000-000000000001';
    logger_1.logger.warn(`uploadBinary(): "${filename}" wird eingelesen.`);
    // https://mongodb.github.io/node-mongodb-native/3.5/tutorials/gridfs/streaming
    const bucket = new mongodb_1.GridFSBucket(db);
    bucket.drop();
    /* global __dirname */
    const readable = fs_1.createReadStream(path_1.resolve(__dirname, filenameBinary));
    const metadata = { contentType };
    gridfs_1.saveReadable(readable, bucket, filename, { metadata }, client);
};
const populateDB = async (dev) => {
    let devMode = dev;
    if (devMode === undefined) {
        devMode = config_1.dbConfig.dbPopulate;
    }
    logger_1.logger.info(`populateDB(): devMode=${devMode}`);
    if (!devMode) {
        return;
    }
    const { db, client } = await mongoDB_1.connectMongoDB();
    const collection = await createCollection(db);
    if (collection === undefined) {
        return;
    }
    await createIndex(collection);
    uploadBinary(db, client);
};
exports.populateDB = populateDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdWxhdGVEQi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvZGIvcG9wdWxhdGVEQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7QUFHSCx3Q0FBcUQ7QUFDckQscUNBQXVDO0FBQ3ZDLHVDQUFvQztBQUNwQyx1Q0FBMkM7QUFDM0MsMkJBQXNDO0FBQ3RDLHNDQUFtQztBQUNuQywrQkFBK0I7QUFDL0IscUNBQXdDO0FBRXhDLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLEVBQU0sRUFBRSxFQUFFO0lBQ3RDLDhFQUE4RTtJQUM5RSxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7SUFDOUIsZUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsY0FBYyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3BFLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJO1FBQ0EsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUNyRDtJQUFDLE9BQU8sR0FBUSxFQUFFO1FBQ2YsMEVBQTBFO1FBQzFFLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7WUFDM0IsZUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDL0QsT0FBTztTQUNWO0tBQ0o7SUFDRCxJQUFJLE9BQU8sRUFBRTtRQUNULGVBQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLGNBQWMsb0JBQW9CLENBQUMsQ0FBQztLQUN0RTtJQUVELGdGQUFnRjtJQUNoRixlQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixjQUFjLHdCQUF3QixDQUFDLENBQUM7SUFDdkUsTUFBTSxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0QsZUFBTSxDQUFDLElBQUksQ0FDUCxt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U0FBUyxFQUFFO1FBQzFCLE9BQU87S0FDVjtJQUVELE1BQU0sV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTlCLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBckJXLFFBQUEsVUFBVSxjQXFCckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIwIC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7IENvbGxlY3Rpb24sIERiLCBNb25nb0NsaWVudCB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgZGJDb25maWcsIHNlcnZlckNvbmZpZyB9IGZyb20gJy4vLi4vY29uZmlnJztcbmltcG9ydCB7IEdyaWRGU0J1Y2tldCB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgYnVlY2hlciB9IGZyb20gJy4vYnVlY2hlcic7XG5pbXBvcnQgeyBjb25uZWN0TW9uZ29EQiB9IGZyb20gJy4vbW9uZ29EQic7XG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IHNhdmVSZWFkYWJsZSB9IGZyb20gJy4vZ3JpZGZzJztcblxuY29uc3QgY3JlYXRlQ29sbGVjdGlvbiA9IGFzeW5jIChkYjogRGIpID0+IHtcbiAgICAvLyBodHRwOi8vbW9uZ29kYi5naXRodWIuaW8vbm9kZS1tb25nb2RiLW5hdGl2ZS8zLjUvYXBpL0RiLmh0bWwjZHJvcENvbGxlY3Rpb25cbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9ICdCdWNoJztcbiAgICBsb2dnZXIud2FybihgRGllIENvbGxlY3Rpb24gXCIke2NvbGxlY3Rpb25OYW1lfVwiIHdpcmQgZ2Vsb2VzY2h0Li4uYCk7XG4gICAgbGV0IGRyb3BwZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBkcm9wcGVkID0gYXdhaXQgZGIuZHJvcENvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIC8vIEZhbGxzIGRlciBFcnJvciAqTklDSFQqIGR1cmNoIGVpbmUgZmVobGVuZGUgQ29sbGVjdGlvbiB2ZXJ1cnNhY2h0IHd1cmRlXG4gICAgICAgIGlmIChlcnIubmFtZSAhPT0gJ01vbmdvRXJyb3InKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEZlaGxlciBiZWltIE5ldWxhZGVuIGRlciBEQiAke2RiLmRhdGFiYXNlTmFtZX1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZHJvcHBlZCkge1xuICAgICAgICBsb2dnZXIud2FybihgRGllIENvbGxlY3Rpb24gXCIke2NvbGxlY3Rpb25OYW1lfVwiIHd1cmRlIGdlbG9lc2NodC5gKTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vbW9uZ29kYi5naXRodWIuaW8vbm9kZS1tb25nb2RiLW5hdGl2ZS8zLjUvYXBpL0RiLmh0bWwjY3JlYXRlQ29sbGVjdGlvblxuICAgIGxvZ2dlci53YXJuKGBEaWUgQ29sbGVjdGlvbiBcIiR7Y29sbGVjdGlvbk5hbWV9XCIgd2lyZCBuZXUgYW5nZWxlZ3QuLi5gKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gYXdhaXQgZGIuY3JlYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICAgIGBEaWUgQ29sbGVjdGlvbiBcIiR7Y29sbGVjdGlvbi5jb2xsZWN0aW9uTmFtZX1cIiB3dXJkZSBuZXUgYW5nZWxlZ3QuYCxcbiAgICApO1xuXG4gICAgLy8gaHR0cDovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvMy41L2FwaS9Db2xsZWN0aW9uLmh0bWwjaW5zZXJ0TWFueVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbGxlY3Rpb24uaW5zZXJ0TWFueShidWVjaGVyKTtcbiAgICBsb2dnZXIud2FybihgJHtyZXN1bHQuaW5zZXJ0ZWRDb3VudH0gRGF0ZW5zYWV0emUgd3VyZGVuIGVpbmdlZnVlZ3QuYCk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbn07XG5cbmNvbnN0IGNyZWF0ZUluZGV4ID0gYXN5bmMgKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pID0+IHtcbiAgICBsb2dnZXIud2FybihcbiAgICAgICAgYEluZGV4ZSBmdWVyIFwiJHtjb2xsZWN0aW9uLmNvbGxlY3Rpb25OYW1lfVwiIHdlcmRlbiBuZXUgYW5nZWxlZ3QuLi5gLFxuICAgICk7XG5cbiAgICAvLyBodHRwOi8vbW9uZ29kYi5naXRodWIuaW8vbm9kZS1tb25nb2RiLW5hdGl2ZS8zLjUvYXBpL0NvbGxlY3Rpb24uaHRtbCNjcmVhdGVJbmRleFxuICAgIC8vIEJlYWNodGU6IGJlaSBjcmVhdGVJbmRleGVzKCkgZ2VsdGVuIGRpZSBPcHRpb25lbiBmdWVyIGFsbGUgSW5kZXhlXG4gICAgbGV0IGluZGV4ID0gYXdhaXQgY29sbGVjdGlvbi5jcmVhdGVJbmRleCgndGl0ZWwnLCB7IHVuaXF1ZTogdHJ1ZSB9KTtcbiAgICBsb2dnZXIud2FybihgRGVyIEluZGV4ICR7aW5kZXh9IHd1cmRlIGFuZ2VsZWd0LmApO1xuICAgIGluZGV4ID0gYXdhaXQgY29sbGVjdGlvbi5jcmVhdGVJbmRleCgnaXNibicsIHsgdW5pcXVlOiB0cnVlIH0pO1xuICAgIGxvZ2dlci53YXJuKGBEZXIgSW5kZXggJHtpbmRleH0gd3VyZGUgYW5nZWxlZ3QuYCk7XG4gICAgaW5kZXggPSBhd2FpdCBjb2xsZWN0aW9uLmNyZWF0ZUluZGV4KCdzY2hsYWd3b2VydGVyJywgeyBzcGFyc2U6IHRydWUgfSk7XG4gICAgbG9nZ2VyLndhcm4oYERlciBJbmRleCAke2luZGV4fSB3dXJkZSBhbmdlbGVndC5gKTtcbn07XG5cbmNvbnN0IHVwbG9hZEJpbmFyeSA9IChkYjogRGIsIGNsaWVudDogTW9uZ29DbGllbnQpID0+IHtcbiAgICAvLyBLZWluIEZpbGUtVXBsb2FkIGluIGRpZSBDbG91ZFxuICAgIGlmIChzZXJ2ZXJDb25maWcuY2xvdWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIuaW5mbygndXBsb2FkQmluYXJ5KCk6IEtlaW5lIEJpbmFlcmRhdGVpZW4gbWl0IGRlciBDbG91ZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZW5hbWVCaW5hcnkgPSAnaW1hZ2UucG5nJztcbiAgICBjb25zdCBjb250ZW50VHlwZSA9ICdpbWFnZS9wbmcnO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxJztcbiAgICBsb2dnZXIud2FybihgdXBsb2FkQmluYXJ5KCk6IFwiJHtmaWxlbmFtZX1cIiB3aXJkIGVpbmdlbGVzZW4uYCk7XG5cbiAgICAvLyBodHRwczovL21vbmdvZGIuZ2l0aHViLmlvL25vZGUtbW9uZ29kYi1uYXRpdmUvMy41L3R1dG9yaWFscy9ncmlkZnMvc3RyZWFtaW5nXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IEdyaWRGU0J1Y2tldChkYik7XG4gICAgYnVja2V0LmRyb3AoKTtcblxuICAgIC8qIGdsb2JhbCBfX2Rpcm5hbWUgKi9cbiAgICBjb25zdCByZWFkYWJsZSA9IGNyZWF0ZVJlYWRTdHJlYW0ocmVzb2x2ZShfX2Rpcm5hbWUsIGZpbGVuYW1lQmluYXJ5KSk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSB7IGNvbnRlbnRUeXBlIH07XG4gICAgc2F2ZVJlYWRhYmxlKHJlYWRhYmxlLCBidWNrZXQsIGZpbGVuYW1lLCB7IG1ldGFkYXRhIH0sIGNsaWVudCk7XG59O1xuXG5leHBvcnQgY29uc3QgcG9wdWxhdGVEQiA9IGFzeW5jIChkZXY/OiBib29sZWFuKSA9PiB7XG4gICAgbGV0IGRldk1vZGUgPSBkZXY7XG4gICAgaWYgKGRldk1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZXZNb2RlID0gZGJDb25maWcuZGJQb3B1bGF0ZTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oYHBvcHVsYXRlREIoKTogZGV2TW9kZT0ke2Rldk1vZGV9YCk7XG5cbiAgICBpZiAoIWRldk1vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGIsIGNsaWVudCB9ID0gYXdhaXQgY29ubmVjdE1vbmdvREIoKTtcblxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBhd2FpdCBjcmVhdGVDb2xsZWN0aW9uKGRiKTtcbiAgICBpZiAoY29sbGVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBjcmVhdGVJbmRleChjb2xsZWN0aW9uKTtcblxuICAgIHVwbG9hZEJpbmFyeShkYiwgY2xpZW50KTtcbn07XG4iXX0=
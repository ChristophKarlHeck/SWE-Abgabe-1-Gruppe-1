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
exports.BuchFileRequestHandler = void 0;
const tslib_1 = require("tslib");
const service_1 = require("./../service");
const shared_1 = require("../../shared");
const json5_1 = tslib_1.__importDefault(require("json5"));
// export bei async und await:
// https://blogs.msdn.microsoft.com/typescript/2015/11/30/announcing-typescript-1-7
// http://tc39.github.io/ecmascript-export
// https://nemethgergely.com/async-function-best-practices#Using-async-functions-with-express
class BuchFileRequestHandler {
    constructor() {
        this.service = new service_1.BuchFileService();
    }
    upload(req, res) {
        const { id } = req.params;
        shared_1.logger.debug(`BuchFileRequestHandler.uploadBinary(): id=${id}`);
        // https://jsao.io/2019/06/uploading-and-downloading-files-buffering-in-node-js
        const data = [];
        let totalBytesInBuffer = 0;
        // Wenn body-parser verwendet wird (z.B. bei textuellen JSON-Daten),
        // dann verarbeitet body-parser die Events "data" und "end".
        // https://nodejs.org/api/http.html#http_class_http_clientrequest
        req.on('data', (chunk) => {
            const { length } = chunk;
            shared_1.logger.debug(`BuchFileRequestHandler.uploadBinary(): data ${length}`);
            data.push(chunk);
            totalBytesInBuffer += length;
        })
            .on('aborted', () => shared_1.logger.debug('BuchFileRequestHandler.uploadBinary(): aborted'))
            .on('end', () => {
            shared_1.logger.debug(`BuchFileRequestHandler.uploadBinary(): end ${totalBytesInBuffer}`);
            const buffer = Buffer.concat(data, totalBytesInBuffer);
            // IIFE (= Immediately Invoked Function Expression) wegen await
            // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
            // https://github.com/typescript-eslint/typescript-eslint/issues/647
            // https://github.com/typescript-eslint/typescript-eslint/pull/1799
            (async () => {
                try {
                    await this.save(req, id, buffer);
                }
                catch (err) {
                    shared_1.logger.error(`Fehler beim Abspeichern: ${json5_1.default.stringify(err)}`);
                    return;
                }
                res.sendStatus(shared_1.HttpStatus.NO_CONTENT);
            })();
        });
    }
    async download(req, res) {
        const { id } = req.params;
        shared_1.logger.debug(`BuchFileRequestHandler.downloadBinary(): ${id}`);
        if (id === undefined) {
            res.status(shared_1.HttpStatus.BAD_REQUEST).send('Keine Buch-Id');
            return;
        }
        const findResult = await this.service.find(id);
        if (findResult instanceof service_1.BuchFileServiceError ||
            findResult instanceof service_1.BuchNotExists) {
            this.handleDownloadError(findResult, res);
            return;
        }
        const file = findResult;
        const { readStream, contentType } = file;
        res.contentType(contentType);
        // https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93
        readStream.pipe(res);
    }
    async save(req, id, buffer) {
        const contentType = req.headers['content-type'];
        await this.service.save(id, buffer, contentType);
    }
    handleDownloadError(err, res) {
        if (err instanceof service_1.BuchNotExists) {
            const { id } = err;
            const msg = `Es gibt kein Buch mit der ID "${id}".`;
            shared_1.logger.debug(`BuchFileRequestHandler.handleDownloadError(): msg=${msg}`);
            res.status(shared_1.HttpStatus.PRECONDITION_FAILED)
                .set('Content-Type', 'text/plain')
                .send(msg);
            return;
        }
        if (err instanceof service_1.FileNotFound) {
            const { filename } = err;
            const msg = `Es gibt kein File mit Name ${filename}`;
            shared_1.logger.debug(`BuchFileRequestHandler.handleDownloadError(): msg=${msg}`);
            res.status(shared_1.HttpStatus.NOT_FOUND).send(msg);
            return;
        }
        if (err instanceof service_1.MultipleFiles) {
            const { filename } = err;
            const msg = `Es gibt mehr als ein File mit Name ${filename}`;
            shared_1.logger.debug(`BuchFileRequestHandler.handleDownloadError(): msg=${msg}`);
            res.status(shared_1.HttpStatus.INTERNAL_ERROR).send(msg);
        }
    }
}
exports.BuchFileRequestHandler = BuchFileRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC1maWxlLnJlcXVlc3QtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWNoL3Jlc3QvYnVjaC1maWxlLnJlcXVlc3QtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgsMENBTXNCO0FBQ3RCLHlDQUFrRDtBQUdsRCwwREFBMEI7QUFFMUIsOEJBQThCO0FBQzlCLG1GQUFtRjtBQUNuRiwwQ0FBMEM7QUFDMUMsNkZBQTZGO0FBRTdGLE1BQWEsc0JBQXNCO0lBQW5DO1FBQ3FCLFlBQU8sR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztJQW1IckQsQ0FBQztJQWpIRyxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDOUIsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDMUIsZUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVoRSwrRUFBK0U7UUFFL0UsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUM5QixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUUzQixvRUFBb0U7UUFDcEUsNERBQTREO1FBQzVELGlFQUFpRTtRQUVqRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQWlCLEVBQUUsRUFBRTtZQUNqQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLGVBQU0sQ0FBQyxLQUFLLENBQ1IsK0NBQStDLE1BQU0sRUFBRSxDQUMxRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixrQkFBa0IsSUFBSSxNQUFNLENBQUM7UUFDakMsQ0FBQyxDQUFDO2FBQ0csRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FDaEIsZUFBTSxDQUFDLEtBQUssQ0FBQyxnREFB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R0FBRyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixRQUFRLEVBQUUsQ0FBQztZQUNyRCxlQUFNLENBQUMsS0FBSyxDQUNSLHFEQUFxRCxHQUFHLEVBQUUsQ0FDN0QsQ0FBQztZQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxHQUFHLFlBQVksdUJBQWEsRUFBRTtZQUM5QixNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLHNDQUFzQyxRQUFRLEVBQUUsQ0FBQztZQUM3RCxlQUFNLENBQUMsS0FBSyxDQUNSLHFEQUFxRCxHQUFHLEVBQUUsQ0FDN0QsQ0FBQztZQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0NBQ0o7QUFwSEQsd0RBb0hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHtcbiAgICBCdWNoRmlsZVNlcnZpY2UsXG4gICAgQnVjaEZpbGVTZXJ2aWNlRXJyb3IsXG4gICAgQnVjaE5vdEV4aXN0cyxcbiAgICBGaWxlTm90Rm91bmQsXG4gICAgTXVsdGlwbGVGaWxlcyxcbn0gZnJvbSAnLi8uLi9zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBTdGF0dXMsIGxvZ2dlciB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgdHlwZSB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgdHlwZSB7IERvd25sb2FkRXJyb3IgfSBmcm9tICcuLi9zZXJ2aWNlJztcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5cbi8vIGV4cG9ydCBiZWkgYXN5bmMgdW5kIGF3YWl0OlxuLy8gaHR0cHM6Ly9ibG9ncy5tc2RuLm1pY3Jvc29mdC5jb20vdHlwZXNjcmlwdC8yMDE1LzExLzMwL2Fubm91bmNpbmctdHlwZXNjcmlwdC0xLTdcbi8vIGh0dHA6Ly90YzM5LmdpdGh1Yi5pby9lY21hc2NyaXB0LWV4cG9ydFxuLy8gaHR0cHM6Ly9uZW1ldGhnZXJnZWx5LmNvbS9hc3luYy1mdW5jdGlvbi1iZXN0LXByYWN0aWNlcyNVc2luZy1hc3luYy1mdW5jdGlvbnMtd2l0aC1leHByZXNzXG5cbmV4cG9ydCBjbGFzcyBCdWNoRmlsZVJlcXVlc3RIYW5kbGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlcnZpY2UgPSBuZXcgQnVjaEZpbGVTZXJ2aWNlKCk7XG5cbiAgICB1cGxvYWQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQnVjaEZpbGVSZXF1ZXN0SGFuZGxlci51cGxvYWRCaW5hcnkoKTogaWQ9JHtpZH1gKTtcblxuICAgICAgICAvLyBodHRwczovL2pzYW8uaW8vMjAxOS8wNi91cGxvYWRpbmctYW5kLWRvd25sb2FkaW5nLWZpbGVzLWJ1ZmZlcmluZy1pbi1ub2RlLWpzXG5cbiAgICAgICAgY29uc3QgZGF0YTogVWludDhBcnJheVtdID0gW107XG4gICAgICAgIGxldCB0b3RhbEJ5dGVzSW5CdWZmZXIgPSAwO1xuXG4gICAgICAgIC8vIFdlbm4gYm9keS1wYXJzZXIgdmVyd2VuZGV0IHdpcmQgKHouQi4gYmVpIHRleHR1ZWxsZW4gSlNPTi1EYXRlbiksXG4gICAgICAgIC8vIGRhbm4gdmVyYXJiZWl0ZXQgYm9keS1wYXJzZXIgZGllIEV2ZW50cyBcImRhdGFcIiB1bmQgXCJlbmRcIi5cbiAgICAgICAgLy8gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9jbGFzc19odHRwX2NsaWVudHJlcXVlc3RcblxuICAgICAgICByZXEub24oJ2RhdGEnLCAoY2h1bms6IFVpbnQ4QXJyYXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBjaHVuaztcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICBgQnVjaEZpbGVSZXF1ZXN0SGFuZGxlci51cGxvYWRCaW5hcnkoKTogZGF0YSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRhdGEucHVzaChjaHVuayk7XG4gICAgICAgICAgICB0b3RhbEJ5dGVzSW5CdWZmZXIgKz0gbGVuZ3RoO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdhYm9ydGVkJywgKCkgPT5cbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0J1Y2hGaWxlUmVxdWVzdEhhbmRsZXIudXBsb2FkQmluYXJ5KCk6IGFib3J0ZWQnKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICAgICAgYEJ1Y2hGaWxlUmVxdWVzdEhhbmRsZXIudXBsb2FkQmluYXJ5KCk6IGVuZCAke3RvdGFsQnl0ZXNJbkJ1ZmZlcn1gLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChkYXRhLCB0b3RhbEJ5dGVzSW5CdWZmZXIpO1xuXG4gICAgICAgICAgICAgICAgLy8gSUlGRSAoPSBJbW1lZGlhdGVseSBJbnZva2VkIEZ1bmN0aW9uIEV4cHJlc3Npb24pIHdlZ2VuIGF3YWl0XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HbG9zc2FyeS9JSUZFXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzY3JpcHQtZXNsaW50L3R5cGVzY3JpcHQtZXNsaW50L2lzc3Vlcy82NDdcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdHlwZXNjcmlwdC1lc2xpbnQvdHlwZXNjcmlwdC1lc2xpbnQvcHVsbC8xNzk5XG4gICAgICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZShyZXEsIGlkLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRmVobGVyIGJlaW0gQWJzcGVpY2hlcm46ICR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhIdHRwU3RhdHVzLk5PX0NPTlRFTlQpO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBkb3dubG9hZChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBCdWNoRmlsZVJlcXVlc3RIYW5kbGVyLmRvd25sb2FkQmluYXJ5KCk6ICR7aWR9YCk7XG4gICAgICAgIGlmICgoaWQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzKEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpLnNlbmQoJ0tlaW5lIEJ1Y2gtSWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbmRSZXN1bHQgPSBhd2FpdCB0aGlzLnNlcnZpY2UuZmluZChpZCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGZpbmRSZXN1bHQgaW5zdGFuY2VvZiBCdWNoRmlsZVNlcnZpY2VFcnJvciB8fFxuICAgICAgICAgICAgZmluZFJlc3VsdCBpbnN0YW5jZW9mIEJ1Y2hOb3RFeGlzdHNcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZURvd25sb2FkRXJyb3IoZmluZFJlc3VsdCwgcmVzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGUgPSBmaW5kUmVzdWx0O1xuICAgICAgICBjb25zdCB7IHJlYWRTdHJlYW0sIGNvbnRlbnRUeXBlIH0gPSBmaWxlO1xuICAgICAgICByZXMuY29udGVudFR5cGUoY29udGVudFR5cGUpO1xuICAgICAgICAvLyBodHRwczovL3d3dy5mcmVlY29kZWNhbXAub3JnL25ld3Mvbm9kZS1qcy1zdHJlYW1zLWV2ZXJ5dGhpbmcteW91LW5lZWQtdG8ta25vdy1jOTE0MTMwNmJlOTNcbiAgICAgICAgcmVhZFN0cmVhbS5waXBlKHJlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBzYXZlKHJlcTogUmVxdWVzdCwgaWQ6IHN0cmluZywgYnVmZmVyOiBCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXEuaGVhZGVyc1snY29udGVudC10eXBlJ107XG4gICAgICAgIGF3YWl0IHRoaXMuc2VydmljZS5zYXZlKGlkLCBidWZmZXIsIGNvbnRlbnRUeXBlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZURvd25sb2FkRXJyb3IoXG4gICAgICAgIGVycjogQnVjaE5vdEV4aXN0cyB8IERvd25sb2FkRXJyb3IsXG4gICAgICAgIHJlczogUmVzcG9uc2UsXG4gICAgKSB7XG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBCdWNoTm90RXhpc3RzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGlkIH0gPSBlcnI7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgRXMgZ2lidCBrZWluIEJ1Y2ggbWl0IGRlciBJRCBcIiR7aWR9XCIuYDtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICBgQnVjaEZpbGVSZXF1ZXN0SGFuZGxlci5oYW5kbGVEb3dubG9hZEVycm9yKCk6IG1zZz0ke21zZ31gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoSHR0cFN0YXR1cy5QUkVDT05ESVRJT05fRkFJTEVEKVxuICAgICAgICAgICAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L3BsYWluJylcbiAgICAgICAgICAgICAgICAuc2VuZChtc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEZpbGVOb3RGb3VuZCkge1xuICAgICAgICAgICAgY29uc3QgeyBmaWxlbmFtZSB9ID0gZXJyO1xuICAgICAgICAgICAgY29uc3QgbXNnID0gYEVzIGdpYnQga2VpbiBGaWxlIG1pdCBOYW1lICR7ZmlsZW5hbWV9YDtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgICAgICBgQnVjaEZpbGVSZXF1ZXN0SGFuZGxlci5oYW5kbGVEb3dubG9hZEVycm9yKCk6IG1zZz0ke21zZ31gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoSHR0cFN0YXR1cy5OT1RfRk9VTkQpLnNlbmQobXNnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBNdWx0aXBsZUZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZpbGVuYW1lIH0gPSBlcnI7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgRXMgZ2lidCBtZWhyIGFscyBlaW4gRmlsZSBtaXQgTmFtZSAke2ZpbGVuYW1lfWA7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgYEJ1Y2hGaWxlUmVxdWVzdEhhbmRsZXIuaGFuZGxlRG93bmxvYWRFcnJvcigpOiBtc2c9JHttc2d9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXMuc3RhdHVzKEh0dHBTdGF0dXMuSU5URVJOQUxfRVJST1IpLnNlbmQobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
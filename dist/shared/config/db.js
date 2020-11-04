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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const tslib_1 = require("tslib");
const json5_1 = tslib_1.__importDefault(require("json5"));
const path_1 = require("path");
const server_1 = require("./server");
// sicherstellen, dass lokal .env eingelesen wurde
console.assert(server_1.serverConfig.host);
// -----------------------------------------------------------------------------
// D e f a u l t w e r t e
// -----------------------------------------------------------------------------
const replicaSet = 'replicaSet';
// -----------------------------------------------------------------------------
// U m g e b u n g s v a r i a b l e
// -----------------------------------------------------------------------------
const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_TLS, DB_POPULATE, MOCK_DB, } = process.env; // eslint-disable-line node/no-process-env
// -----------------------------------------------------------------------------
// E i n s t e l l u n g e n
// -----------------------------------------------------------------------------
const dbName = DB_NAME !== null && DB_NAME !== void 0 ? DB_NAME : 'acme';
const atlas = (_a = DB_HOST === null || DB_HOST === void 0 ? void 0 : DB_HOST.endsWith('mongodb.net')) !== null && _a !== void 0 ? _a : false;
const host = DB_HOST !== null && DB_HOST !== void 0 ? DB_HOST : 'localhost';
const port = 27017;
const user = DB_USER !== null && DB_USER !== void 0 ? DB_USER : 'admin';
const pass = DB_PASS !== null && DB_PASS !== void 0 ? DB_PASS : 'p';
const tls = DB_TLS === undefined || DB_TLS === 'true' || DB_TLS === 'TRUE';
const dbPopulate = DB_POPULATE !== undefined;
let url;
let adminUrl;
if (atlas) {
    // https://docs.mongodb.com/manual/reference/connection-string
    // Default:
    //  retryWrites=true            ab MongoDB-Treiber 4.2
    //  readPreference=primary
    // "mongodb+srv://" statt "mongodb://" fuer eine "DNS seedlist" z.B. bei "Replica Set"
    // https://docs.mongodb.com/manual/reference/write-concern
    url = `mongodb+srv://${user}:${pass}@${host}/${dbName}?replicaSet=Cluster0-shard-0&w=majority`;
    adminUrl = `mongodb+srv://${user}:${pass}@${host}/admin?w=majority`;
}
else {
    url = `mongodb://${user}:${pass}@${host}/${dbName}?replicaSet=${replicaSet}&authSource=admin`;
    adminUrl = `mongodb://${user}:${pass}@${host}/admin`;
}
const mockDB = MOCK_DB === 'true';
exports.dbConfig = {
    atlas,
    url,
    adminUrl,
    dbName,
    host,
    port,
    user,
    pass,
    tls,
    tlsCertificateKeyFile: atlas || !tls
        ? undefined
        : path_1.resolve('C:\\', 'Zimmermann', 'volumes', 'mongodb-replicaset-4.2', 'tls', 'key.pem'),
    dbPopulate,
    mockDB,
};
const dbConfigLog = {
    atlas,
    url: url.replace(/\/\/.*:/u, '//USERNAME:@').replace(/:[^:]*@/u, ':***@'),
    adminUrl: adminUrl
        .replace(/\/\/.*:/u, '//USERNAME:@')
        .replace(/:[^:]*@/u, ':***@'),
    dbName,
    host,
    port,
    tls,
    dbPopulate,
    mockDB,
};
console.info(`dbConfig: ${json5_1.default.stringify(dbConfigLog)}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2NvbmZpZy9kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7OztBQUVILDBEQUEwQjtBQUMxQiwrQkFBK0I7QUFDL0IscUNBQXdDO0FBRXhDLGtEQUFrRDtBQUNsRCxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEMsZ0ZBQWdGO0FBQ2hGLDBCQUEwQjtBQUMxQixnRkFBZ0Y7QUFDaEYsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBRWhDLGdGQUFnRjtBQUNoRixvQ0FBb0M7QUFDcEMsZ0ZBQWdGO0FBQ2hGLE1BQU0sRUFDRixPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxPQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQVcsRUFDWCxPQUFPLEdBQ1YsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsMENBQTBDO0FBRTNELGdGQUFnRjtBQUNoRiw0QkFBNEI7QUFDNUIsZ0ZBQWdGO0FBQ2hGLE1BQU0sTUFBTSxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLE1BQU0sQ0FBQztBQUNqQyxNQUFNLEtBQUssU0FBRyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDLGFBQWEsb0NBQUssS0FBSyxDQUFDO0FBQ3hELE1BQU0sSUFBSSxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLFdBQVcsQ0FBQztBQUNwQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBTSxJQUFJLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksT0FBTyxDQUFDO0FBQ2hDLE1BQU0sSUFBSSxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEdBQUcsQ0FBQztBQUM1QixNQUFNLEdBQUcsR0FBRyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUMzRSxNQUFNLFVBQVUsR0FBRyxXQUFXLEtBQUssU0FBUyxDQUFDO0FBRTdDLElBQUksR0FBVyxDQUFDO0FBQ2hCLElBQUksUUFBZ0IsQ0FBQztBQUVyQixJQUFJLEtBQUssRUFBRTtJQUNQLDhEQUE4RDtJQUM5RCxXQUFXO0lBQ1gsc0RBQXNEO0lBQ3RELDBCQUEwQjtJQUMxQixzRkFBc0Y7SUFDdEYsMERBQTBEO0lBQzFELEdBQUcsR0FBRyxpQkFBaUIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksTUFBTSx5Q0FBeUMsQ0FBQztJQUMvRixRQUFRLEdBQUcsaUJBQWlCLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxtQkFBbUIsQ0FBQztDQUN2RTtLQUFNO0lBQ0gsR0FBRyxHQUFHLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksTUFBTSxlQUFlLFVBQVUsbUJBQW1CLENBQUM7SUFDOUYsUUFBUSxHQUFHLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQztDQUN4RDtBQUVELE1BQU0sTUFBTSxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7QUFFckIsUUFBQSxRQUFRLEdBQUc7SUFDcEIsS0FBSztJQUNMLEdBQUc7SUFDSCxRQUFRO0lBQ1IsTUFBTTtJQUNOLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixHQUFHO0lBQ0gscUJBQXFCLEVBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUc7UUFDVCxDQUFDLENBQUMsU0FBUztRQUNYLENBQUMsQ0FBQyxjQUFPLENBQ0gsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1Qsd0JBQXdCLEVBQ3hCLEtBQUssRUFDTCxTQUFTLENBQ1o7SUFDWCxVQUFVO0lBQ1YsTUFBTTtDQUNULENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixLQUFLO0lBQ0wsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO0lBQ3pFLFFBQVEsRUFBRSxRQUFRO1NBQ2IsT0FBTyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUM7U0FDbkMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7SUFDakMsTUFBTTtJQUNOLElBQUk7SUFDSixJQUFJO0lBQ0osR0FBRztJQUNILFVBQVU7SUFDVixNQUFNO0NBQ1QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxlQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjAgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBzZXJ2ZXJDb25maWcgfSBmcm9tICcuL3NlcnZlcic7XG5cbi8vIHNpY2hlcnN0ZWxsZW4sIGRhc3MgbG9rYWwgLmVudiBlaW5nZWxlc2VuIHd1cmRlXG5jb25zb2xlLmFzc2VydChzZXJ2ZXJDb25maWcuaG9zdCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBEIGUgZiBhIHUgbCB0IHcgZSByIHQgZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNvbnN0IHJlcGxpY2FTZXQgPSAncmVwbGljYVNldCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBVIG0gZyBlIGIgdSBuIGcgcyB2IGEgciBpIGEgYiBsIGVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jb25zdCB7XG4gICAgREJfTkFNRSxcbiAgICBEQl9IT1NULFxuICAgIERCX1VTRVIsXG4gICAgREJfUEFTUyxcbiAgICBEQl9UTFMsXG4gICAgREJfUE9QVUxBVEUsXG4gICAgTU9DS19EQixcbn0gPSBwcm9jZXNzLmVudjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBub2RlL25vLXByb2Nlc3MtZW52XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFIGkgbiBzIHQgZSBsIGwgdSBuIGcgZSBuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY29uc3QgZGJOYW1lID0gREJfTkFNRSA/PyAnYWNtZSc7XG5jb25zdCBhdGxhcyA9IERCX0hPU1Q/LmVuZHNXaXRoKCdtb25nb2RiLm5ldCcpID8/IGZhbHNlO1xuY29uc3QgaG9zdCA9IERCX0hPU1QgPz8gJ2xvY2FsaG9zdCc7XG5jb25zdCBwb3J0ID0gMjcwMTc7XG5jb25zdCB1c2VyID0gREJfVVNFUiA/PyAnYWRtaW4nO1xuY29uc3QgcGFzcyA9IERCX1BBU1MgPz8gJ3AnO1xuY29uc3QgdGxzID0gREJfVExTID09PSB1bmRlZmluZWQgfHwgREJfVExTID09PSAndHJ1ZScgfHwgREJfVExTID09PSAnVFJVRSc7XG5jb25zdCBkYlBvcHVsYXRlID0gREJfUE9QVUxBVEUgIT09IHVuZGVmaW5lZDtcblxubGV0IHVybDogc3RyaW5nO1xubGV0IGFkbWluVXJsOiBzdHJpbmc7XG5cbmlmIChhdGxhcykge1xuICAgIC8vIGh0dHBzOi8vZG9jcy5tb25nb2RiLmNvbS9tYW51YWwvcmVmZXJlbmNlL2Nvbm5lY3Rpb24tc3RyaW5nXG4gICAgLy8gRGVmYXVsdDpcbiAgICAvLyAgcmV0cnlXcml0ZXM9dHJ1ZSAgICAgICAgICAgIGFiIE1vbmdvREItVHJlaWJlciA0LjJcbiAgICAvLyAgcmVhZFByZWZlcmVuY2U9cHJpbWFyeVxuICAgIC8vIFwibW9uZ29kYitzcnY6Ly9cIiBzdGF0dCBcIm1vbmdvZGI6Ly9cIiBmdWVyIGVpbmUgXCJETlMgc2VlZGxpc3RcIiB6LkIuIGJlaSBcIlJlcGxpY2EgU2V0XCJcbiAgICAvLyBodHRwczovL2RvY3MubW9uZ29kYi5jb20vbWFudWFsL3JlZmVyZW5jZS93cml0ZS1jb25jZXJuXG4gICAgdXJsID0gYG1vbmdvZGIrc3J2Oi8vJHt1c2VyfToke3Bhc3N9QCR7aG9zdH0vJHtkYk5hbWV9P3JlcGxpY2FTZXQ9Q2x1c3RlcjAtc2hhcmQtMCZ3PW1ham9yaXR5YDtcbiAgICBhZG1pblVybCA9IGBtb25nb2RiK3NydjovLyR7dXNlcn06JHtwYXNzfUAke2hvc3R9L2FkbWluP3c9bWFqb3JpdHlgO1xufSBlbHNlIHtcbiAgICB1cmwgPSBgbW9uZ29kYjovLyR7dXNlcn06JHtwYXNzfUAke2hvc3R9LyR7ZGJOYW1lfT9yZXBsaWNhU2V0PSR7cmVwbGljYVNldH0mYXV0aFNvdXJjZT1hZG1pbmA7XG4gICAgYWRtaW5VcmwgPSBgbW9uZ29kYjovLyR7dXNlcn06JHtwYXNzfUAke2hvc3R9L2FkbWluYDtcbn1cblxuY29uc3QgbW9ja0RCID0gTU9DS19EQiA9PT0gJ3RydWUnO1xuXG5leHBvcnQgY29uc3QgZGJDb25maWcgPSB7XG4gICAgYXRsYXMsXG4gICAgdXJsLFxuICAgIGFkbWluVXJsLFxuICAgIGRiTmFtZSxcbiAgICBob3N0LFxuICAgIHBvcnQsXG4gICAgdXNlcixcbiAgICBwYXNzLFxuICAgIHRscyxcbiAgICB0bHNDZXJ0aWZpY2F0ZUtleUZpbGU6XG4gICAgICAgIGF0bGFzIHx8ICF0bHNcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICA6IHJlc29sdmUoXG4gICAgICAgICAgICAgICAgICAnQzpcXFxcJyxcbiAgICAgICAgICAgICAgICAgICdaaW1tZXJtYW5uJyxcbiAgICAgICAgICAgICAgICAgICd2b2x1bWVzJyxcbiAgICAgICAgICAgICAgICAgICdtb25nb2RiLXJlcGxpY2FzZXQtNC4yJyxcbiAgICAgICAgICAgICAgICAgICd0bHMnLFxuICAgICAgICAgICAgICAgICAgJ2tleS5wZW0nLFxuICAgICAgICAgICAgICApLFxuICAgIGRiUG9wdWxhdGUsXG4gICAgbW9ja0RCLFxufTtcblxuY29uc3QgZGJDb25maWdMb2cgPSB7XG4gICAgYXRsYXMsXG4gICAgdXJsOiB1cmwucmVwbGFjZSgvXFwvXFwvLio6L3UsICcvL1VTRVJOQU1FOkAnKS5yZXBsYWNlKC86W146XSpAL3UsICc6KioqQCcpLFxuICAgIGFkbWluVXJsOiBhZG1pblVybFxuICAgICAgICAucmVwbGFjZSgvXFwvXFwvLio6L3UsICcvL1VTRVJOQU1FOkAnKVxuICAgICAgICAucmVwbGFjZSgvOlteOl0qQC91LCAnOioqKkAnKSxcbiAgICBkYk5hbWUsXG4gICAgaG9zdCxcbiAgICBwb3J0LFxuICAgIHRscyxcbiAgICBkYlBvcHVsYXRlLFxuICAgIG1vY2tEQixcbn07XG5cbmNvbnNvbGUuaW5mbyhgZGJDb25maWc6ICR7SlNPTjUuc3RyaW5naWZ5KGRiQ29uZmlnTG9nKX1gKTtcbiJdfQ==
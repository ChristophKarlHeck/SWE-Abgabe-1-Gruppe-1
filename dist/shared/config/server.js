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
exports.serverConfig = exports.uuidRegexp = exports.Cloud = void 0;
const tslib_1 = require("tslib");
// Umgebungsvariable durch die Konfigurationsdatei .env
const json5_1 = tslib_1.__importDefault(require("json5"));
const re2_1 = tslib_1.__importDefault(require("re2"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const os_1 = require("os");
const ip_1 = tslib_1.__importDefault(require("ip"));
const fs_1 = require("fs");
const path_1 = require("path");
var Cloud;
(function (Cloud) {
    Cloud["HEROKU"] = "heroku";
    Cloud["OPENSHIFT"] = "openshift";
})(Cloud = exports.Cloud || (exports.Cloud = {}));
// .env nur einlesen, falls nicht in der Cloud
dotenv_1.default.config();
const computername = os_1.hostname();
const ipAddress = ip_1.default.address();
// https://github.com/google/re2
// https://github.com/uhop/node-re2
exports.uuidRegexp = new re2_1.default('[\\dA-Fa-f]{8}-[\\dA-Fa-f]{4}-[\\dA-Fa-f]{4}-[\\dA-Fa-f]{4}-[\\dA-Fa-f]{12}', 'u');
// hostname() ist bei
//  * Heroku:       eine UUID
//  * OpenShift:    <Projektname_aus_package.json>-<Build-Nr>-<random-alphanumeric-5stellig>
let cloud;
const herokuRegexp = exports.uuidRegexp;
if (herokuRegexp.test(computername)) {
    cloud = Cloud.HEROKU;
}
else {
    const openshiftRegexp = new re2_1.default('beispiel-\\d+-w{5}', 'u');
    if (openshiftRegexp.test(computername)) {
        cloud = Cloud.OPENSHIFT;
    }
}
const { env } = process;
const { NODE_ENV, SERVER_PORT, APOLLO_PLAYGROUND, MAIL_HOST, MAIL_PORT, MAIL_LOG, } = env;
const production = NODE_ENV === 'production';
let dev = false;
if (NODE_ENV !== undefined &&
    (NODE_ENV.startsWith('dev') || NODE_ENV.startsWith('test'))) {
    dev = true;
}
let port = Number.NaN;
if (SERVER_PORT !== undefined) {
    port = Number.parseInt(SERVER_PORT, 10);
}
if (Number.isNaN(port)) {
    // SERVER_PORT ist zwar gesetzt, aber keine Zahl
    // https://devcenter.heroku.com/articles/runtime-principles#web-servers
    port =
        cloud === undefined || cloud === Cloud.OPENSHIFT
            ? 3000 // eslint-disable-line @typescript-eslint/no-magic-numbers
            : Number.parseInt(env.PORT, 10);
}
const playground = APOLLO_PLAYGROUND === 'true' || APOLLO_PLAYGROUND === 'TRUE';
// HS Karlsruhe:   smtp.hs-karlsruhe.de
const mailHost = MAIL_HOST !== null && MAIL_HOST !== void 0 ? MAIL_HOST : 'localhost';
// HS Karlsruhe:   25
const mailPortStr = MAIL_PORT !== null && MAIL_PORT !== void 0 ? MAIL_PORT : '5025';
const mailPort = Number.parseInt(mailPortStr, 10);
const mailLog = MAIL_LOG === 'true' || MAIL_LOG === 'TRUE';
exports.serverConfig = {
    dev,
    production,
    host: computername,
    ip: ipAddress,
    port,
    cloud,
    playground,
    // https://nodejs.org/api/fs.html
    // https://nodejs.org/api/path.html
    // http://2ality.com/2017/11/import-meta.html
    /* global __dirname */
    key: cloud === undefined
        ? fs_1.readFileSync(path_1.resolve(__dirname, 'key.pem'))
        : undefined,
    cert: cloud === undefined
        ? fs_1.readFileSync(path_1.resolve(__dirname, 'certificate.cer'))
        : undefined,
    mailHost,
    mailPort,
    mailLog,
};
const logServerConfig = {
    dev,
    production,
    host: computername,
    port,
    ip: ipAddress,
    cloud,
    playground,
    mailHost,
    mailPort,
    mailLog,
};
console.info(`serverConfig: ${json5_1.default.stringify(logServerConfig)}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb25maWcvc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7QUFFSCx1REFBdUQ7QUFDdkQsMERBQTBCO0FBQzFCLHNEQUFzQjtBQUN0Qiw0REFBNEI7QUFDNUIsMkJBQThCO0FBQzlCLG9EQUFvQjtBQUNwQiwyQkFBa0M7QUFDbEMsK0JBQStCO0FBRS9CLElBQVksS0FHWDtBQUhELFdBQVksS0FBSztJQUNiLDBCQUFpQixDQUFBO0lBQ2pCLGdDQUF1QixDQUFBO0FBQzNCLENBQUMsRUFIVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFHaEI7QUFpQkQsOENBQThDO0FBQzlDLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxZQUFZLEdBQUcsYUFBUSxFQUFFLENBQUM7QUFDaEMsTUFBTSxTQUFTLEdBQUcsWUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRS9CLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDdEIsUUFBQSxVQUFVLEdBQUcsSUFBSSxhQUFHLENBQzdCLDZFQUE2RSxFQUM3RSxHQUFHLENBQ04sQ0FBQztBQUVGLHFCQUFxQjtBQUNyQiw2QkFBNkI7QUFDN0IsNEZBQTRGO0FBQzVGLElBQUksS0FBd0IsQ0FBQztBQUM3QixNQUFNLFlBQVksR0FBRyxrQkFBVSxDQUFDO0FBQ2hDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtJQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztDQUN4QjtLQUFNO0lBQ0gsTUFBTSxlQUFlLEdBQUcsSUFBSSxhQUFHLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3BDLEtBQUssR0FBRyxLQUFLLENB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LSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8vIFVtZ2VidW5nc3ZhcmlhYmxlIGR1cmNoIGRpZSBLb25maWd1cmF0aW9uc2RhdGVpIC5lbnZcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5pbXBvcnQgUkUyIGZyb20gJ3JlMic7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBob3N0bmFtZSB9IGZyb20gJ29zJztcbmltcG9ydCBpcCBmcm9tICdpcCc7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBlbnVtIENsb3VkIHtcbiAgICBIRVJPS1UgPSAnaGVyb2t1JyxcbiAgICBPUEVOU0hJRlQgPSAnb3BlbnNoaWZ0Jyxcbn1cblxuaW50ZXJmYWNlIFNlcnZlckNvbmZpZyB7XG4gICAgZGV2OiBib29sZWFuO1xuICAgIHByb2R1Y3Rpb246IGJvb2xlYW47XG4gICAgaG9zdDogc3RyaW5nO1xuICAgIHBvcnQ6IG51bWJlcjtcbiAgICBpcDogc3RyaW5nO1xuICAgIGNsb3VkOiBDbG91ZCB8IHVuZGVmaW5lZDtcbiAgICBwbGF5Z3JvdW5kOiBib29sZWFuO1xuICAgIGtleT86IEJ1ZmZlcjtcbiAgICBjZXJ0PzogQnVmZmVyO1xuICAgIG1haWxIb3N0OiBzdHJpbmc7XG4gICAgbWFpbFBvcnQ6IG51bWJlcjtcbiAgICBtYWlsTG9nOiBib29sZWFuO1xufVxuXG4vLyAuZW52IG51ciBlaW5sZXNlbiwgZmFsbHMgbmljaHQgaW4gZGVyIENsb3VkXG5kb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IGNvbXB1dGVybmFtZSA9IGhvc3RuYW1lKCk7XG5jb25zdCBpcEFkZHJlc3MgPSBpcC5hZGRyZXNzKCk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvcmUyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdWhvcC9ub2RlLXJlMlxuZXhwb3J0IGNvbnN0IHV1aWRSZWdleHAgPSBuZXcgUkUyKFxuICAgICdbXFxcXGRBLUZhLWZdezh9LVtcXFxcZEEtRmEtZl17NH0tW1xcXFxkQS1GYS1mXXs0fS1bXFxcXGRBLUZhLWZdezR9LVtcXFxcZEEtRmEtZl17MTJ9JyxcbiAgICAndScsXG4pO1xuXG4vLyBob3N0bmFtZSgpIGlzdCBiZWlcbi8vICAqIEhlcm9rdTogICAgICAgZWluZSBVVUlEXG4vLyAgKiBPcGVuU2hpZnQ6ICAgIDxQcm9qZWt0bmFtZV9hdXNfcGFja2FnZS5qc29uPi08QnVpbGQtTnI+LTxyYW5kb20tYWxwaGFudW1lcmljLTVzdGVsbGlnPlxubGV0IGNsb3VkOiBDbG91ZCB8IHVuZGVmaW5lZDtcbmNvbnN0IGhlcm9rdVJlZ2V4cCA9IHV1aWRSZWdleHA7XG5pZiAoaGVyb2t1UmVnZXhwLnRlc3QoY29tcHV0ZXJuYW1lKSkge1xuICAgIGNsb3VkID0gQ2xvdWQuSEVST0tVO1xufSBlbHNlIHtcbiAgICBjb25zdCBvcGVuc2hpZnRSZWdleHAgPSBuZXcgUkUyKCdiZWlzcGllbC1cXFxcZCstd3s1fScsICd1Jyk7XG4gICAgaWYgKG9wZW5zaGlmdFJlZ2V4cC50ZXN0KGNvbXB1dGVybmFtZSkpIHtcbiAgICAgICAgY2xvdWQgPSBDbG91ZC5PUEVOU0hJRlQ7XG4gICAgfVxufVxuXG5jb25zdCB7IGVudiB9ID0gcHJvY2VzcztcbmNvbnN0IHtcbiAgICBOT0RFX0VOVixcbiAgICBTRVJWRVJfUE9SVCxcbiAgICBBUE9MTE9fUExBWUdST1VORCxcbiAgICBNQUlMX0hPU1QsXG4gICAgTUFJTF9QT1JULFxuICAgIE1BSUxfTE9HLFxufSA9IGVudjtcbmNvbnN0IHByb2R1Y3Rpb24gPSBOT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuXG5sZXQgZGV2ID0gZmFsc2U7XG5pZiAoXG4gICAgTk9ERV9FTlYgIT09IHVuZGVmaW5lZCAmJlxuICAgIChOT0RFX0VOVi5zdGFydHNXaXRoKCdkZXYnKSB8fCBOT0RFX0VOVi5zdGFydHNXaXRoKCd0ZXN0JykpXG4pIHtcbiAgICBkZXYgPSB0cnVlO1xufVxuXG5sZXQgcG9ydCA9IE51bWJlci5OYU47XG5pZiAoU0VSVkVSX1BPUlQgIT09IHVuZGVmaW5lZCkge1xuICAgIHBvcnQgPSBOdW1iZXIucGFyc2VJbnQoU0VSVkVSX1BPUlQsIDEwKTtcbn1cbmlmIChOdW1iZXIuaXNOYU4ocG9ydCkpIHtcbiAgICAvLyBTRVJWRVJfUE9SVCBpc3QgendhciBnZXNldHp0LCBhYmVyIGtlaW5lIFphaGxcbiAgICAvLyBodHRwczovL2RldmNlbnRlci5oZXJva3UuY29tL2FydGljbGVzL3J1bnRpbWUtcHJpbmNpcGxlcyN3ZWItc2VydmVyc1xuICAgIHBvcnQgPVxuICAgICAgICBjbG91ZCA9PT0gdW5kZWZpbmVkIHx8IGNsb3VkID09PSBDbG91ZC5PUEVOU0hJRlRcbiAgICAgICAgICAgID8gMzAwMCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1tYWdpYy1udW1iZXJzXG4gICAgICAgICAgICA6IE51bWJlci5wYXJzZUludChlbnYuUE9SVCBhcyBzdHJpbmcsIDEwKTtcbn1cblxuY29uc3QgcGxheWdyb3VuZCA9IEFQT0xMT19QTEFZR1JPVU5EID09PSAndHJ1ZScgfHwgQVBPTExPX1BMQVlHUk9VTkQgPT09ICdUUlVFJztcblxuLy8gSFMgS2FybHNydWhlOiAgIHNtdHAuaHMta2FybHNydWhlLmRlXG5jb25zdCBtYWlsSG9zdCA9IE1BSUxfSE9TVCA/PyAnbG9jYWxob3N0Jztcbi8vIEhTIEthcmxzcnVoZTogICAyNVxuY29uc3QgbWFpbFBvcnRTdHIgPSBNQUlMX1BPUlQgPz8gJzUwMjUnO1xuY29uc3QgbWFpbFBvcnQgPSBOdW1iZXIucGFyc2VJbnQobWFpbFBvcnRTdHIsIDEwKTtcbmNvbnN0IG1haWxMb2cgPSBNQUlMX0xPRyA9PT0gJ3RydWUnIHx8IE1BSUxfTE9HID09PSAnVFJVRSc7XG5cbmV4cG9ydCBjb25zdCBzZXJ2ZXJDb25maWc6IFNlcnZlckNvbmZpZyA9IHtcbiAgICBkZXYsXG4gICAgcHJvZHVjdGlvbixcbiAgICBob3N0OiBjb21wdXRlcm5hbWUsXG4gICAgaXA6IGlwQWRkcmVzcyxcbiAgICBwb3J0LFxuICAgIGNsb3VkLFxuICAgIHBsYXlncm91bmQsXG5cbiAgICAvLyBodHRwczovL25vZGVqcy5vcmcvYXBpL2ZzLmh0bWxcbiAgICAvLyBodHRwczovL25vZGVqcy5vcmcvYXBpL3BhdGguaHRtbFxuICAgIC8vIGh0dHA6Ly8yYWxpdHkuY29tLzIwMTcvMTEvaW1wb3J0LW1ldGEuaHRtbFxuICAgIC8qIGdsb2JhbCBfX2Rpcm5hbWUgKi9cbiAgICBrZXk6XG4gICAgICAgIGNsb3VkID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gcmVhZEZpbGVTeW5jKHJlc29sdmUoX19kaXJuYW1lLCAna2V5LnBlbScpKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgY2VydDpcbiAgICAgICAgY2xvdWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyByZWFkRmlsZVN5bmMocmVzb2x2ZShfX2Rpcm5hbWUsICdjZXJ0aWZpY2F0ZS5jZXInKSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgIG1haWxIb3N0LFxuICAgIG1haWxQb3J0LFxuICAgIG1haWxMb2csXG59O1xuXG5jb25zdCBsb2dTZXJ2ZXJDb25maWcgPSB7XG4gICAgZGV2LFxuICAgIHByb2R1Y3Rpb24sXG4gICAgaG9zdDogY29tcHV0ZXJuYW1lLFxuICAgIHBvcnQsXG4gICAgaXA6IGlwQWRkcmVzcyxcbiAgICBjbG91ZCxcbiAgICBwbGF5Z3JvdW5kLFxuICAgIG1haWxIb3N0LFxuICAgIG1haWxQb3J0LFxuICAgIG1haWxMb2csXG59O1xuY29uc29sZS5pbmZvKGBzZXJ2ZXJDb25maWc6ICR7SlNPTjUuc3RyaW5naWZ5KGxvZ1NlcnZlckNvbmZpZyl9YCk7XG4iXX0=
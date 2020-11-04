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
exports.fileOptions = exports.consoleOptions = void 0;
const server_1 = require("./server");
const winston_1 = require("winston");
// Winston: seit 2010 bei GoDaddy (Registrierung von Domains)
// Log-Levels: error, warn, info, debug, verbose, silly, ...
// Medien (= Transports): Console, File, ...
// https://github.com/winstonjs/winston/blob/master/docs/transports.md
// Alternative: Bunyan, Pino
const { colorize, combine, json, simple, timestamp } = winston_1.format;
const { cloud, production } = server_1.serverConfig;
const loglevelConsoleDev = cloud === undefined ? 'info' : 'debug';
const consoleFormat = cloud === undefined ? combine(colorize(), simple()) : simple();
exports.consoleOptions = {
    level: production && cloud !== server_1.Cloud.HEROKU ? 'warn' : loglevelConsoleDev,
    format: consoleFormat,
};
exports.fileOptions = {
    filename: 'server.log',
    level: production ? 'info' : 'debug',
    // 250 KB
    maxsize: 250000,
    maxFiles: 3,
    format: combine(timestamp(), json()),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb25maWcvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUVILHFDQUErQztBQUMvQyxxQ0FBaUM7QUFFakMsNkRBQTZEO0FBQzdELDREQUE0RDtBQUM1RCw0Q0FBNEM7QUFDNUMsc0VBQXNFO0FBQ3RFLDRCQUE0QjtBQUU1QixNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLGdCQUFNLENBQUM7QUFDOUQsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxxQkFBWSxDQUFDO0FBRTNDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbEUsTUFBTSxhQUFhLEdBQ2YsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RELFFBQUEsY0FBYyxHQUFHO0lBQzFCLEtBQUssRUFBRSxVQUFVLElBQUksS0FBSyxLQUFLLGNBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsa0JBQWtCO0lBQ3pFLE1BQU0sRUFBRSxhQUFhO0NBQ3hCLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRztJQUN2QixRQUFRLEVBQUUsWUFBWTtJQUN0QixLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87SUFDcEMsU0FBUztJQUNULE9BQU8sRUFBRSxNQUFNO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQ3ZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBDbG91ZCwgc2VydmVyQ29uZmlnIH0gZnJvbSAnLi9zZXJ2ZXInO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnd2luc3Rvbic7XG5cbi8vIFdpbnN0b246IHNlaXQgMjAxMCBiZWkgR29EYWRkeSAoUmVnaXN0cmllcnVuZyB2b24gRG9tYWlucylcbi8vIExvZy1MZXZlbHM6IGVycm9yLCB3YXJuLCBpbmZvLCBkZWJ1ZywgdmVyYm9zZSwgc2lsbHksIC4uLlxuLy8gTWVkaWVuICg9IFRyYW5zcG9ydHMpOiBDb25zb2xlLCBGaWxlLCAuLi5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93aW5zdG9uanMvd2luc3Rvbi9ibG9iL21hc3Rlci9kb2NzL3RyYW5zcG9ydHMubWRcbi8vIEFsdGVybmF0aXZlOiBCdW55YW4sIFBpbm9cblxuY29uc3QgeyBjb2xvcml6ZSwgY29tYmluZSwganNvbiwgc2ltcGxlLCB0aW1lc3RhbXAgfSA9IGZvcm1hdDtcbmNvbnN0IHsgY2xvdWQsIHByb2R1Y3Rpb24gfSA9IHNlcnZlckNvbmZpZztcblxuY29uc3QgbG9nbGV2ZWxDb25zb2xlRGV2ID0gY2xvdWQgPT09IHVuZGVmaW5lZCA/ICdpbmZvJyA6ICdkZWJ1Zyc7XG5jb25zdCBjb25zb2xlRm9ybWF0ID1cbiAgICBjbG91ZCA9PT0gdW5kZWZpbmVkID8gY29tYmluZShjb2xvcml6ZSgpLCBzaW1wbGUoKSkgOiBzaW1wbGUoKTtcbmV4cG9ydCBjb25zdCBjb25zb2xlT3B0aW9ucyA9IHtcbiAgICBsZXZlbDogcHJvZHVjdGlvbiAmJiBjbG91ZCAhPT0gQ2xvdWQuSEVST0tVID8gJ3dhcm4nIDogbG9nbGV2ZWxDb25zb2xlRGV2LFxuICAgIGZvcm1hdDogY29uc29sZUZvcm1hdCxcbn07XG5cbmV4cG9ydCBjb25zdCBmaWxlT3B0aW9ucyA9IHtcbiAgICBmaWxlbmFtZTogJ3NlcnZlci5sb2cnLFxuICAgIGxldmVsOiBwcm9kdWN0aW9uID8gJ2luZm8nIDogJ2RlYnVnJyxcbiAgICAvLyAyNTAgS0JcbiAgICBtYXhzaXplOiAyNTAwMDAsXG4gICAgbWF4RmlsZXM6IDMsXG4gICAgZm9ybWF0OiBjb21iaW5lKHRpbWVzdGFtcCgpLCBqc29uKCkpLFxufTtcbiJdfQ==
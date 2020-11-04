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
exports.logger = void 0;
const tslib_1 = require("tslib");
const config_1 = require("./config");
const winston_1 = require("winston");
const json5_1 = tslib_1.__importDefault(require("json5"));
// Winston: seit 2010 bei GoDaddy (Registrierung von Domains)
// Log-Levels: error, warn, info, debug, verbose, silly, ...
// Medien (= Transports): Console, File, ...
// https://github.com/winstonjs/winston/blob/master/docs/transports.md
// Alternative: Bunyan, Pino
const { cloud } = config_1.serverConfig;
const { Console, File } = winston_1.transports; // eslint-disable-line @typescript-eslint/naming-convention
/* eslint-disable object-curly-newline */
exports.logger = cloud === undefined
    ? winston_1.createLogger({
        transports: [new Console(config_1.consoleOptions), new File(config_1.fileOptions)],
    })
    : winston_1.createLogger({
        transports: new Console(config_1.consoleOptions),
    });
/* eslint-enable object-curly-newline */
exports.logger.info('Logging durch Winston ist konfiguriert');
exports.logger.debug(`consoleOptions: ${json5_1.default.stringify(config_1.consoleOptions)}`);
if (cloud === undefined) {
    exports.logger.debug(`fileOptions: ${json5_1.default.stringify(config_1.fileOptions)}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NoYXJlZC9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILHFDQUFxRTtBQUNyRSxxQ0FBbUQ7QUFDbkQsMERBQTBCO0FBRTFCLDZEQUE2RDtBQUM3RCw0REFBNEQ7QUFDNUQsNENBQTRDO0FBQzVDLHNFQUFzRTtBQUN0RSw0QkFBNEI7QUFFNUIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLHFCQUFZLENBQUM7QUFDL0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxvQkFBVSxDQUFDLENBQUMsMkRBQTJEO0FBQ2pHLHlDQUF5QztBQUM1QixRQUFBLE1BQU0sR0FDZixLQUFLLEtBQUssU0FBUztJQUNmLENBQUMsQ0FBQyxzQkFBWSxDQUFDO1FBQ1QsVUFBVSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsdUJBQWMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFXLENBQUMsQ0FBQztLQUNuRSxDQUFDO0lBQ0osQ0FBQyxDQUFDLHNCQUFZLENBQUM7UUFDVCxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsdUJBQWMsQ0FBQztLQUMxQyxDQUFDLENBQUM7QUFDYix3Q0FBd0M7QUFFeEMsY0FBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBQ3RELGNBQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLGVBQUssQ0FBQyxTQUFTLENBQUMsdUJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVuRSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7SUFDckIsY0FBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsZUFBSyxDQUFDLFNBQVMsQ0FBQyxvQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2hFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHsgY29uc29sZU9wdGlvbnMsIGZpbGVPcHRpb25zLCBzZXJ2ZXJDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIsIHRyYW5zcG9ydHMgfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG5cbi8vIFdpbnN0b246IHNlaXQgMjAxMCBiZWkgR29EYWRkeSAoUmVnaXN0cmllcnVuZyB2b24gRG9tYWlucylcbi8vIExvZy1MZXZlbHM6IGVycm9yLCB3YXJuLCBpbmZvLCBkZWJ1ZywgdmVyYm9zZSwgc2lsbHksIC4uLlxuLy8gTWVkaWVuICg9IFRyYW5zcG9ydHMpOiBDb25zb2xlLCBGaWxlLCAuLi5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93aW5zdG9uanMvd2luc3Rvbi9ibG9iL21hc3Rlci9kb2NzL3RyYW5zcG9ydHMubWRcbi8vIEFsdGVybmF0aXZlOiBCdW55YW4sIFBpbm9cblxuY29uc3QgeyBjbG91ZCB9ID0gc2VydmVyQ29uZmlnO1xuY29uc3QgeyBDb25zb2xlLCBGaWxlIH0gPSB0cmFuc3BvcnRzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuLyogZXNsaW50LWRpc2FibGUgb2JqZWN0LWN1cmx5LW5ld2xpbmUgKi9cbmV4cG9ydCBjb25zdCBsb2dnZXIgPVxuICAgIGNsb3VkID09PSB1bmRlZmluZWRcbiAgICAgICAgPyBjcmVhdGVMb2dnZXIoe1xuICAgICAgICAgICAgICB0cmFuc3BvcnRzOiBbbmV3IENvbnNvbGUoY29uc29sZU9wdGlvbnMpLCBuZXcgRmlsZShmaWxlT3B0aW9ucyldLFxuICAgICAgICAgIH0pXG4gICAgICAgIDogY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0czogbmV3IENvbnNvbGUoY29uc29sZU9wdGlvbnMpLFxuICAgICAgICAgIH0pO1xuLyogZXNsaW50LWVuYWJsZSBvYmplY3QtY3VybHktbmV3bGluZSAqL1xuXG5sb2dnZXIuaW5mbygnTG9nZ2luZyBkdXJjaCBXaW5zdG9uIGlzdCBrb25maWd1cmllcnQnKTtcbmxvZ2dlci5kZWJ1ZyhgY29uc29sZU9wdGlvbnM6ICR7SlNPTjUuc3RyaW5naWZ5KGNvbnNvbGVPcHRpb25zKX1gKTtcblxuaWYgKGNsb3VkID09PSB1bmRlZmluZWQpIHtcbiAgICBsb2dnZXIuZGVidWcoYGZpbGVPcHRpb25zOiAke0pTT041LnN0cmluZ2lmeShmaWxlT3B0aW9ucyl9YCk7XG59XG4iXX0=
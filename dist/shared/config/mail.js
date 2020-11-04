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
exports.mailConfig = void 0;
const server_1 = require("./server");
exports.mailConfig = {
    host: server_1.serverConfig.mailHost,
    port: server_1.serverConfig.mailPort,
    secure: false,
    // Googlemail:
    // service: 'gmail',
    // auth: {
    //     user: 'Meine.Benutzerkennung@gmail.com',
    //     pass: 'mypassword'
    // }
    priority: 'normal',
    logger: server_1.serverConfig.mailLog,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'X-ProvidedBy': 'Software Engineering' },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY29uZmlnL21haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBR0gscUNBQXdDO0FBRTNCLFFBQUEsVUFBVSxHQUFZO0lBQy9CLElBQUksRUFBRSxxQkFBWSxDQUFDLFFBQVE7SUFDM0IsSUFBSSxFQUFFLHFCQUFZLENBQUMsUUFBUTtJQUMzQixNQUFNLEVBQUUsS0FBSztJQUViLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLCtDQUErQztJQUMvQyx5QkFBeUI7SUFDekIsSUFBSTtJQUVKLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLE1BQU0sRUFBRSxxQkFBWSxDQUFDLE9BQU87SUFDNUIsZ0VBQWdFO0lBQ2hFLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRTtDQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBPcHRpb25zIH0gZnJvbSAnbm9kZW1haWxlci9saWIvc210cC10cmFuc3BvcnQnO1xuaW1wb3J0IHsgc2VydmVyQ29uZmlnIH0gZnJvbSAnLi9zZXJ2ZXInO1xuXG5leHBvcnQgY29uc3QgbWFpbENvbmZpZzogT3B0aW9ucyA9IHtcbiAgICBob3N0OiBzZXJ2ZXJDb25maWcubWFpbEhvc3QsXG4gICAgcG9ydDogc2VydmVyQ29uZmlnLm1haWxQb3J0LFxuICAgIHNlY3VyZTogZmFsc2UsXG5cbiAgICAvLyBHb29nbGVtYWlsOlxuICAgIC8vIHNlcnZpY2U6ICdnbWFpbCcsXG4gICAgLy8gYXV0aDoge1xuICAgIC8vICAgICB1c2VyOiAnTWVpbmUuQmVudXR6ZXJrZW5udW5nQGdtYWlsLmNvbScsXG4gICAgLy8gICAgIHBhc3M6ICdteXBhc3N3b3JkJ1xuICAgIC8vIH1cblxuICAgIHByaW9yaXR5OiAnbm9ybWFsJyxcbiAgICBsb2dnZXI6IHNlcnZlckNvbmZpZy5tYWlsTG9nLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICBoZWFkZXJzOiB7ICdYLVByb3ZpZGVkQnknOiAnU29mdHdhcmUgRW5naW5lZXJpbmcnIH0sXG59O1xuIl19
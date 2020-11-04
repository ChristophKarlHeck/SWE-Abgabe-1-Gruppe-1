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
exports.corsHandler = void 0;
const tslib_1 = require("tslib");
// Einlesen von application/json im Request-Rumpf
// Fuer multimediale Daten (Videos, Bilder, Audios): raw-body
const cors_1 = tslib_1.__importDefault(require("cors"));
exports.corsHandler = 
// CORS = Cross Origin Resource Sharing
//   http://www.html5rocks.com/en/tutorials/cors
//   https://www.w3.org/TR/cors
cors_1.default({
    origin: 'https://localhost:4200',
    // nachfolgende Optionen nur fuer OPTIONS:
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'Authorization',
        // 'Access-Control-Allow-Origin',
        // 'Access-Control-Allow-Methods',
        // 'Access-Control-Allow-Headers',
        'Allow',
        'Content-Length',
        'Date',
        'Last-Modified',
        'If-Match',
        'If-Not-Match',
        'If-Modified-Since',
    ],
    exposedHeaders: ['Location', 'ETag'],
    maxAge: 86400,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycy5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlY3VyaXR5L2NvcnMuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgsaURBQWlEO0FBQ2pELDZEQUE2RDtBQUM3RCx3REFBd0I7QUFFWCxRQUFBLFdBQVc7QUFDcEIsdUNBQXVDO0FBQ3ZDLGdEQUFnRDtBQUNoRCwrQkFBK0I7QUFDL0IsY0FBSSxDQUFDO0lBQ0QsTUFBTSxFQUFFLHdCQUF3QjtJQUNoQywwQ0FBMEM7SUFDMUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7SUFDMUQsY0FBYyxFQUFFO1FBQ1osUUFBUTtRQUNSLGNBQWM7UUFDZCxRQUFRO1FBQ1IsZUFBZTtRQUNmLGlDQUFpQztRQUNqQyxrQ0FBa0M7UUFDbEMsa0NBQWtDO1FBQ2xDLE9BQU87UUFDUCxnQkFBZ0I7UUFDaEIsTUFBTTtRQUNOLGVBQWU7UUFDZixVQUFVO1FBQ1YsY0FBYztRQUNkLG1CQUFtQjtLQUN0QjtJQUNELGNBQWMsRUFBRSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUM7SUFDcEMsTUFBTSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLy8gRWlubGVzZW4gdm9uIGFwcGxpY2F0aW9uL2pzb24gaW0gUmVxdWVzdC1SdW1wZlxuLy8gRnVlciBtdWx0aW1lZGlhbGUgRGF0ZW4gKFZpZGVvcywgQmlsZGVyLCBBdWRpb3MpOiByYXctYm9keVxuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5cbmV4cG9ydCBjb25zdCBjb3JzSGFuZGxlciA9XG4gICAgLy8gQ09SUyA9IENyb3NzIE9yaWdpbiBSZXNvdXJjZSBTaGFyaW5nXG4gICAgLy8gICBodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9jb3JzXG4gICAgLy8gICBodHRwczovL3d3dy53My5vcmcvVFIvY29yc1xuICAgIGNvcnMoe1xuICAgICAgICBvcmlnaW46ICdodHRwczovL2xvY2FsaG9zdDo0MjAwJyxcbiAgICAgICAgLy8gbmFjaGZvbGdlbmRlIE9wdGlvbmVuIG51ciBmdWVyIE9QVElPTlM6XG4gICAgICAgIG1ldGhvZHM6IFsnR0VUJywgJ0hFQUQnLCAnUE9TVCcsICdQVVQnLCAnUEFUQ0gnLCAnREVMRVRFJ10sXG4gICAgICAgIGFsbG93ZWRIZWFkZXJzOiBbXG4gICAgICAgICAgICAnT3JpZ2luJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnLFxuICAgICAgICAgICAgJ0FjY2VwdCcsXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICAvLyAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJyxcbiAgICAgICAgICAgIC8vICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJyxcbiAgICAgICAgICAgIC8vICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJyxcbiAgICAgICAgICAgICdBbGxvdycsXG4gICAgICAgICAgICAnQ29udGVudC1MZW5ndGgnLFxuICAgICAgICAgICAgJ0RhdGUnLFxuICAgICAgICAgICAgJ0xhc3QtTW9kaWZpZWQnLFxuICAgICAgICAgICAgJ0lmLU1hdGNoJyxcbiAgICAgICAgICAgICdJZi1Ob3QtTWF0Y2gnLFxuICAgICAgICAgICAgJ0lmLU1vZGlmaWVkLVNpbmNlJyxcbiAgICAgICAgXSxcbiAgICAgICAgZXhwb3NlZEhlYWRlcnM6IFsnTG9jYXRpb24nLCAnRVRhZyddLFxuICAgICAgICBtYXhBZ2U6IDg2NDAwLFxuICAgIH0pO1xuIl19
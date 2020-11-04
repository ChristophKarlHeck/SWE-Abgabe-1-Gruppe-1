"use strict";
/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.responseTimeFn = exports.readFileAsync = void 0;
const logger_1 = require("./logger");
const util_1 = require("util");
// https://nodejs.org/api/fs.html
const fs_1 = require("fs");
/**
 * Asynchrone Function readFile von Node.js erfordert ein Callback und wird
 * in ein Promise gekapselt, damit spaeter async/await verwendet werden kann.
 */
exports.readFileAsync = util_1.promisify(fs_1.readFile);
const responseTimeFn = (_, __, time) => logger_1.logger.debug(`Response time: ${time} ms`); // eslint-disable-line @typescript-eslint/naming-convention
exports.responseTimeFn = responseTimeFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NoYXJlZC9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBR0gscUNBQWtDO0FBQ2xDLCtCQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsMkJBQThCO0FBRTlCOzs7R0FHRztBQUNVLFFBQUEsYUFBYSxHQUFHLGdCQUFTLENBQUMsYUFBUSxDQUFDLENBQUM7QUFFMUMsTUFBTSxjQUFjLEdBSWYsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLDJEQUEyRDtBQUp0SCxRQUFBLGNBQWMsa0JBSTRDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNSAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBJbmNvbWluZ01lc3NhZ2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbi8vIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZnMuaHRtbFxuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICdmcyc7XG5cbi8qKlxuICogQXN5bmNocm9uZSBGdW5jdGlvbiByZWFkRmlsZSB2b24gTm9kZS5qcyBlcmZvcmRlcnQgZWluIENhbGxiYWNrIHVuZCB3aXJkXG4gKiBpbiBlaW4gUHJvbWlzZSBnZWthcHNlbHQsIGRhbWl0IHNwYWV0ZXIgYXN5bmMvYXdhaXQgdmVyd2VuZGV0IHdlcmRlbiBrYW5uLlxuICovXG5leHBvcnQgY29uc3QgcmVhZEZpbGVBc3luYyA9IHByb21pc2lmeShyZWFkRmlsZSk7XG5cbmV4cG9ydCBjb25zdCByZXNwb25zZVRpbWVGbjogKFxuICAgIHJlcTogSW5jb21pbmdNZXNzYWdlLFxuICAgIHJlczogU2VydmVyUmVzcG9uc2UsXG4gICAgdGltZTogbnVtYmVyLFxuKSA9PiB2b2lkID0gKF8sIF9fLCB0aW1lKSA9PiBsb2dnZXIuZGVidWcoYFJlc3BvbnNlIHRpbWU6ICR7dGltZX0gbXNgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiJdfQ==
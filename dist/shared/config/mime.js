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
exports.getExtension = exports.mimeConfig = void 0;
exports.mimeConfig = {
    contentType: 'content-type',
    json: 'application/json',
};
const getExtension = (mimeType) => {
    switch (mimeType) {
        case 'image/png':
            return 'png';
        case 'image/jpeg':
            return 'jpeg';
        case 'image/gif':
            return 'gif';
        case 'image/bmp':
            return 'bmp';
        case 'video/mp4':
            return 'mp4';
        default:
            return '';
    }
};
exports.getExtension = getExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY29uZmlnL21pbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBRVUsUUFBQSxVQUFVLEdBQUc7SUFDdEIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsSUFBSSxFQUFFLGtCQUFrQjtDQUMzQixDQUFDO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUFnQixFQUFVLEVBQUU7SUFDckQsUUFBUSxRQUFRLEVBQUU7UUFDZCxLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLFlBQVk7WUFDYixPQUFPLE1BQU0sQ0FBQztRQUNsQixLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLFdBQVc7WUFDWixPQUFPLEtBQUssQ0FBQztRQUNqQjtZQUNJLE9BQU8sRUFBRSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQyxDQUFDO0FBZlcsUUFBQSxZQUFZLGdCQWV2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmV4cG9ydCBjb25zdCBtaW1lQ29uZmlnID0ge1xuICAgIGNvbnRlbnRUeXBlOiAnY29udGVudC10eXBlJyxcbiAgICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXh0ZW5zaW9uID0gKG1pbWVUeXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAobWltZVR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW1hZ2UvcG5nJzpcbiAgICAgICAgICAgIHJldHVybiAncG5nJztcbiAgICAgICAgY2FzZSAnaW1hZ2UvanBlZyc6XG4gICAgICAgICAgICByZXR1cm4gJ2pwZWcnO1xuICAgICAgICBjYXNlICdpbWFnZS9naWYnOlxuICAgICAgICAgICAgcmV0dXJuICdnaWYnO1xuICAgICAgICBjYXNlICdpbWFnZS9ibXAnOlxuICAgICAgICAgICAgcmV0dXJuICdibXAnO1xuICAgICAgICBjYXNlICd2aWRlby9tcDQnOlxuICAgICAgICAgICAgcmV0dXJuICdtcDQnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn07XG4iXX0=
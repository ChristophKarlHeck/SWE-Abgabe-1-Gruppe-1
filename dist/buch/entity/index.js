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
exports.validateBuch = exports.BuchModel = exports.buchSchema = exports.Verlag = exports.BuchArt = void 0;
var buch_1 = require("./buch");
Object.defineProperty(exports, "BuchArt", { enumerable: true, get: function () { return buch_1.BuchArt; } });
Object.defineProperty(exports, "Verlag", { enumerable: true, get: function () { return buch_1.Verlag; } });
var buch_model_1 = require("./buch.model");
Object.defineProperty(exports, "buchSchema", { enumerable: true, get: function () { return buch_model_1.buchSchema; } });
Object.defineProperty(exports, "BuchModel", { enumerable: true, get: function () { return buch_model_1.BuchModel; } });
var validateBuch_1 = require("./validateBuch");
Object.defineProperty(exports, "validateBuch", { enumerable: true, get: function () { return validateBuch_1.validateBuch; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVjaC9lbnRpdHkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBRUgsK0JBQXlEO0FBQTFDLCtGQUFBLE9BQU8sT0FBQTtBQUFZLDhGQUFBLE1BQU0sT0FBQTtBQUN4QywyQ0FBcUQ7QUFBNUMsd0dBQUEsVUFBVSxPQUFBO0FBQUUsdUdBQUEsU0FBUyxPQUFBO0FBQzlCLCtDQUFrRTtBQUFyQyw0R0FBQSxZQUFZLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIwIC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5leHBvcnQgeyBCdWNoLCBCdWNoQXJ0LCBCdWNoRGF0YSwgVmVybGFnIH0gZnJvbSAnLi9idWNoJztcbmV4cG9ydCB7IGJ1Y2hTY2hlbWEsIEJ1Y2hNb2RlbCB9IGZyb20gJy4vYnVjaC5tb2RlbCc7XG5leHBvcnQgeyBWYWxpZGF0aW9uRXJyb3JNc2csIHZhbGlkYXRlQnVjaCB9IGZyb20gJy4vdmFsaWRhdGVCdWNoJztcbiJdfQ==
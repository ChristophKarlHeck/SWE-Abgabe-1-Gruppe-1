"use strict";
/*
 * Copyright (C) 2019 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.HttpStatus = void 0;
/* eslint-disable @typescript-eslint/no-magic-numbers */
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HttpStatus[HttpStatus["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HttpStatus[HttpStatus["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HttpStatus[HttpStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    HttpStatus[HttpStatus["NOT_YET_IMPLEMENTED"] = 501] = "NOT_YET_IMPLEMENTED";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
/* eslint-enable @typescript-eslint/no-magic-numbers */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFN0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvaHR0cFN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7QUFFSCx3REFBd0Q7QUFDeEQsSUFBWSxVQWNYO0FBZEQsV0FBWSxVQUFVO0lBQ2xCLHlDQUFRLENBQUE7SUFDUixtREFBYSxDQUFBO0lBQ2IseURBQWdCLENBQUE7SUFDaEIsNkRBQWtCLENBQUE7SUFDbEIsMkRBQWlCLENBQUE7SUFDakIsNkRBQWtCLENBQUE7SUFDbEIsdURBQWUsQ0FBQTtJQUNmLHVEQUFlLENBQUE7SUFDZixpRUFBb0IsQ0FBQTtJQUNwQiwyRUFBeUIsQ0FBQTtJQUN6QiwrRUFBMkIsQ0FBQTtJQUMzQixpRUFBb0IsQ0FBQTtJQUNwQiwyRUFBeUIsQ0FBQTtBQUM3QixDQUFDLEVBZFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFjckI7QUFDRCx1REFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWFnaWMtbnVtYmVycyAqL1xuZXhwb3J0IGVudW0gSHR0cFN0YXR1cyB7XG4gICAgT0sgPSAyMDAsXG4gICAgQ1JFQVRFRCA9IDIwMSxcbiAgICBOT19DT05URU5UID0gMjA0LFxuICAgIE5PVF9NT0RJRklFRCA9IDMwNCxcbiAgICBCQURfUkVRVUVTVCA9IDQwMCxcbiAgICBVTkFVVEhPUklaRUQgPSA0MDEsXG4gICAgRk9SQklEREVOID0gNDAzLFxuICAgIE5PVF9GT1VORCA9IDQwNCxcbiAgICBOT1RfQUNDRVBUQUJMRSA9IDQwNixcbiAgICBQUkVDT05ESVRJT05fRkFJTEVEID0gNDEyLFxuICAgIFBSRUNPTkRJVElPTl9SRVFVSVJFRCA9IDQyOCxcbiAgICBJTlRFUk5BTF9FUlJPUiA9IDUwMCxcbiAgICBOT1RfWUVUX0lNUExFTUVOVEVEID0gNTAxLFxufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbWFnaWMtbnVtYmVycyAqL1xuIl19
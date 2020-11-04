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
exports.validateBuch = void 0;
const tslib_1 = require("tslib");
const shared_1 = require("../../shared");
const json5_1 = tslib_1.__importDefault(require("json5"));
const validator_1 = tslib_1.__importDefault(require("validator"));
const { isISBN, isISO8601, isURL } = validator_1.default;
/* eslint-disable max-lines-per-function, no-null/no-null */
const validateBuch = (buch) => {
    const err = {};
    const { titel, art, rating, verlag, datum, isbn, homepage } = buch;
    if (titel === undefined || titel === null || titel === '') {
        err.titel = 'Ein Buch muss einen Titel haben.';
    }
    else if (!/^\w.*/u.test(titel)) {
        err.titel =
            'Ein Buchtitel muss mit einem Buchstaben, einer Ziffer oder _ beginnen.';
    }
    if (art === undefined || art === null || art === '') {
        err.art = 'Die Art eines Buches muss gesetzt sein';
    }
    else if (art !== 'KINDLE' &&
        art !== 'DRUCKAUSGABE') {
        err.art = 'Die Art eines Buches muss KINDLE oder DRUCKAUSGABE sein.';
    }
    if (rating !== undefined &&
        rating !== null &&
        (rating < 0 || rating > shared_1.MAX_RATING)) {
        err.rating = `${rating} ist keine gueltige Bewertung.`;
    }
    if (verlag === undefined || verlag === null || verlag === '') {
        err.verlag = 'Der Verlag des Buches muss gesetzt sein.';
    }
    else if (verlag !== 'FOO_VERLAG' &&
        verlag !== 'BAR_VERLAG') {
        err.verlag =
            'Der Verlag eines Buches muss FOO_VERLAG oder BAR_VERLAG sein.';
    }
    if (typeof datum === 'string' && !isISO8601(datum)) {
        err.datum = `'${datum}' ist kein gueltiges Datum (yyyy-MM-dd).`;
    }
    if (isbn !== undefined &&
        isbn !== null &&
        (typeof isbn !== 'string' || !isISBN(isbn))) {
        err.isbn = `'${isbn}' ist keine gueltige ISBN-Nummer.`;
    }
    // Falls "preis" ein string ist: Pruefung z.B. 12.30
    // if (isPresent(preis) && !isCurrency(`${preis}`)) {
    //     err.preis = `${preis} ist kein gueltiger Preis`
    // }
    if (homepage !== undefined &&
        homepage !== null &&
        (typeof homepage !== 'string' || !isURL(homepage))) {
        err.homepage = `'${homepage}' ist keine gueltige URL.`;
    }
    shared_1.logger.debug(`validateBuch: err=${json5_1.default.stringify(err)}`);
    return Object.entries(err).length === 0 ? undefined : err;
};
exports.validateBuch = validateBuch;
/* eslint-enable max-lines-per-function, no-null/no-null */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVCdWNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1Y2gvZW50aXR5L3ZhbGlkYXRlQnVjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgseUNBQWtEO0FBRWxELDBEQUEwQjtBQUMxQixrRUFBa0M7QUFFbEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsbUJBQVMsQ0FBQztBQWEvQyw0REFBNEQ7QUFDckQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFVLEVBQUUsRUFBRTtJQUN2QyxNQUFNLEdBQUcsR0FBdUIsRUFBRSxDQUFDO0lBQ25DLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFFbkUsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUN2RCxHQUFHLENBQUMsS0FBSyxHQUFHLGtDQUFrQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDOUIsR0FBRyxDQUFDLEtBQUs7WUFDTCx3RUFBd0UsQ0FBQztLQUNoRjtJQUVELElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7UUFDakQsR0FBRyxDQUFDLEdBQUcsR0FBRyx3Q0FBd0MsQ0FBQztLQUN0RDtTQUFNLElBQ0YsR0FBZSxLQUFLLFFBQVE7UUFDNUIsR0FBZSxLQUFLLGNBQWMsRUFDckM7UUFDRSxHQUFHLENBQUMsR0FBRyxHQUFHLDBEQUEwRCxDQUFDO0tBQ3hFO0lBRUQsSUFDSSxNQUFNLEtBQUssU0FBUztRQUNwQixNQUFNLEtBQUssSUFBSTtRQUNmLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsbUJBQVUsQ0FBQyxFQUNyQztRQUNFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGdDQUFnQyxDQUFDO0tBQzFEO0lBRUQsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtRQUMxRCxHQUFHLENBQUMsTUFBTSxHQUFHLDBDQUEwQyxDQUFDO0tBQzNEO1NBQU0sSUFDRixNQUFrQixLQUFLLFlBQVk7UUFDbkMsTUFBa0IsS0FBSyxZQUFZLEVBQ3RDO1FBQ0UsR0FBRyxDQUFDLE1BQU07WUFDTiwrREFBK0QsQ0FBQztLQUN2RTtJQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hELEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLDBDQUEwQyxDQUFDO0tBQ25FO0lBRUQsSUFDSSxJQUFJLEtBQUssU0FBUztRQUNsQixJQUFJLEtBQUssSUFBSTtRQUNiLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzdDO1FBQ0UsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksbUNBQW1DLENBQUM7S0FDMUQ7SUFFRCxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELHNEQUFzRDtJQUN0RCxJQUFJO0lBQ0osSUFDSSxRQUFRLEtBQUssU0FBUztRQUN0QixRQUFRLEtBQUssSUFBSTtRQUNqQixDQUFDLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNwRDtRQUNFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLDJCQUEyQixDQUFDO0tBQzFEO0lBRUQsZUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsZUFBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzlELENBQUMsQ0FBQztBQWhFVyxRQUFBLFlBQVksZ0JBZ0V2QjtBQUNGLDJEQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IE1BWF9SQVRJTkcsIGxvZ2dlciB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgdHlwZSB7IEJ1Y2ggfSBmcm9tICcuL2J1Y2gnO1xuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAndmFsaWRhdG9yJztcblxuY29uc3QgeyBpc0lTQk4sIGlzSVNPODYwMSwgaXNVUkwgfSA9IHZhbGlkYXRvcjtcblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uRXJyb3JNc2cge1xuICAgIGlkPzogc3RyaW5nO1xuICAgIHRpdGVsPzogc3RyaW5nO1xuICAgIGFydD86IHN0cmluZztcbiAgICByYXRpbmc/OiBzdHJpbmc7XG4gICAgdmVybGFnPzogc3RyaW5nO1xuICAgIGRhdHVtPzogc3RyaW5nO1xuICAgIGlzYm4/OiBzdHJpbmc7XG4gICAgaG9tZXBhZ2U/OiBzdHJpbmc7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1saW5lcy1wZXItZnVuY3Rpb24sIG5vLW51bGwvbm8tbnVsbCAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQnVjaCA9IChidWNoOiBCdWNoKSA9PiB7XG4gICAgY29uc3QgZXJyOiBWYWxpZGF0aW9uRXJyb3JNc2cgPSB7fTtcbiAgICBjb25zdCB7IHRpdGVsLCBhcnQsIHJhdGluZywgdmVybGFnLCBkYXR1bSwgaXNibiwgaG9tZXBhZ2UgfSA9IGJ1Y2g7XG5cbiAgICBpZiAodGl0ZWwgPT09IHVuZGVmaW5lZCB8fCB0aXRlbCA9PT0gbnVsbCB8fCB0aXRlbCA9PT0gJycpIHtcbiAgICAgICAgZXJyLnRpdGVsID0gJ0VpbiBCdWNoIG11c3MgZWluZW4gVGl0ZWwgaGFiZW4uJztcbiAgICB9IGVsc2UgaWYgKCEvXlxcdy4qL3UudGVzdCh0aXRlbCkpIHtcbiAgICAgICAgZXJyLnRpdGVsID1cbiAgICAgICAgICAgICdFaW4gQnVjaHRpdGVsIG11c3MgbWl0IGVpbmVtIEJ1Y2hzdGFiZW4sIGVpbmVyIFppZmZlciBvZGVyIF8gYmVnaW5uZW4uJztcbiAgICB9XG5cbiAgICBpZiAoYXJ0ID09PSB1bmRlZmluZWQgfHwgYXJ0ID09PSBudWxsIHx8IGFydCA9PT0gJycpIHtcbiAgICAgICAgZXJyLmFydCA9ICdEaWUgQXJ0IGVpbmVzIEJ1Y2hlcyBtdXNzIGdlc2V0enQgc2Vpbic7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgKGFydCBhcyB1bmtub3duKSAhPT0gJ0tJTkRMRScgJiZcbiAgICAgICAgKGFydCBhcyB1bmtub3duKSAhPT0gJ0RSVUNLQVVTR0FCRSdcbiAgICApIHtcbiAgICAgICAgZXJyLmFydCA9ICdEaWUgQXJ0IGVpbmVzIEJ1Y2hlcyBtdXNzIEtJTkRMRSBvZGVyIERSVUNLQVVTR0FCRSBzZWluLic7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICByYXRpbmcgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICByYXRpbmcgIT09IG51bGwgJiZcbiAgICAgICAgKHJhdGluZyA8IDAgfHwgcmF0aW5nID4gTUFYX1JBVElORylcbiAgICApIHtcbiAgICAgICAgZXJyLnJhdGluZyA9IGAke3JhdGluZ30gaXN0IGtlaW5lIGd1ZWx0aWdlIEJld2VydHVuZy5gO1xuICAgIH1cblxuICAgIGlmICh2ZXJsYWcgPT09IHVuZGVmaW5lZCB8fCB2ZXJsYWcgPT09IG51bGwgfHwgdmVybGFnID09PSAnJykge1xuICAgICAgICBlcnIudmVybGFnID0gJ0RlciBWZXJsYWcgZGVzIEJ1Y2hlcyBtdXNzIGdlc2V0enQgc2Vpbi4nO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh2ZXJsYWcgYXMgdW5rbm93bikgIT09ICdGT09fVkVSTEFHJyAmJlxuICAgICAgICAodmVybGFnIGFzIHVua25vd24pICE9PSAnQkFSX1ZFUkxBRydcbiAgICApIHtcbiAgICAgICAgZXJyLnZlcmxhZyA9XG4gICAgICAgICAgICAnRGVyIFZlcmxhZyBlaW5lcyBCdWNoZXMgbXVzcyBGT09fVkVSTEFHIG9kZXIgQkFSX1ZFUkxBRyBzZWluLic7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXR1bSA9PT0gJ3N0cmluZycgJiYgIWlzSVNPODYwMShkYXR1bSkpIHtcbiAgICAgICAgZXJyLmRhdHVtID0gYCcke2RhdHVtfScgaXN0IGtlaW4gZ3VlbHRpZ2VzIERhdHVtICh5eXl5LU1NLWRkKS5gO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgaXNibiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGlzYm4gIT09IG51bGwgJiZcbiAgICAgICAgKHR5cGVvZiBpc2JuICE9PSAnc3RyaW5nJyB8fCAhaXNJU0JOKGlzYm4pKVxuICAgICkge1xuICAgICAgICBlcnIuaXNibiA9IGAnJHtpc2JufScgaXN0IGtlaW5lIGd1ZWx0aWdlIElTQk4tTnVtbWVyLmA7XG4gICAgfVxuXG4gICAgLy8gRmFsbHMgXCJwcmVpc1wiIGVpbiBzdHJpbmcgaXN0OiBQcnVlZnVuZyB6LkIuIDEyLjMwXG4gICAgLy8gaWYgKGlzUHJlc2VudChwcmVpcykgJiYgIWlzQ3VycmVuY3koYCR7cHJlaXN9YCkpIHtcbiAgICAvLyAgICAgZXJyLnByZWlzID0gYCR7cHJlaXN9IGlzdCBrZWluIGd1ZWx0aWdlciBQcmVpc2BcbiAgICAvLyB9XG4gICAgaWYgKFxuICAgICAgICBob21lcGFnZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIGhvbWVwYWdlICE9PSBudWxsICYmXG4gICAgICAgICh0eXBlb2YgaG9tZXBhZ2UgIT09ICdzdHJpbmcnIHx8ICFpc1VSTChob21lcGFnZSkpXG4gICAgKSB7XG4gICAgICAgIGVyci5ob21lcGFnZSA9IGAnJHtob21lcGFnZX0nIGlzdCBrZWluZSBndWVsdGlnZSBVUkwuYDtcbiAgICB9XG5cbiAgICBsb2dnZXIuZGVidWcoYHZhbGlkYXRlQnVjaDogZXJyPSR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCk7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGVycikubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogZXJyO1xufTtcbi8qIGVzbGludC1lbmFibGUgbWF4LWxpbmVzLXBlci1mdW5jdGlvbiwgbm8tbnVsbC9uby1udWxsICovXG4iXX0=
"use strict";
/*
 * Copyright (C) 2018 - present Juergen Zimmermann, Hochschule Karlsruhe
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
exports.buecher = exports.buch = void 0;
const entity_1 = require("./../../entity");
/* eslint-disable @typescript-eslint/naming-convention */
exports.buch = {
    _id: '00000000-0000-0000-0000-000000000001',
    titel: 'Alpha',
    rating: 4,
    art: entity_1.BuchArt.DRUCKAUSGABE,
    verlag: entity_1.Verlag.FOO_VERLAG,
    preis: 11.1,
    rabatt: 0.011,
    lieferbar: true,
    datum: new Date('2018-02-01T00:00:00.000Z'),
    isbn: '000-0-00000-000-1',
    homepage: 'https://acme.at/',
    schlagwoerter: ['JAVASCRIPT'],
    autoren: [
        {
            nachname: 'Alpha',
            vorname: 'Adriana',
        },
        {
            nachname: 'Alpha',
            vorname: 'Alfred',
        },
    ],
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
};
exports.buecher = [
    exports.buch,
    {
        _id: '00000000-0000-0000-0000-000000000002',
        titel: 'Beta',
        rating: 2,
        art: entity_1.BuchArt.KINDLE,
        verlag: entity_1.Verlag.FOO_VERLAG,
        preis: 22.2,
        rabatt: 0.022,
        lieferbar: true,
        datum: new Date('2018-02-02T00:00:00.000Z'),
        isbn: '000-0-00000-000-2',
        homepage: 'https://acme.biz/',
        schlagwoerter: ['TYPESCRIPT'],
        autoren: [
            {
                nachname: 'Beta',
                vorname: 'Brunhilde',
            },
        ],
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
    },
];
/* eslint-enable @typescript-eslint/naming-convention */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9idWNoL3NlcnZpY2UvbW9jay9idWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUVILDJDQUFpRDtBQUdqRCx5REFBeUQ7QUFFNUMsUUFBQSxJQUFJLEdBQWE7SUFDMUIsR0FBRyxFQUFFLHNDQUFzQztJQUMzQyxLQUFLLEVBQUUsT0FBTztJQUNkLE1BQU0sRUFBRSxDQUFDO0lBQ1QsR0FBRyxFQUFFLGdCQUFPLENBQUMsWUFBWTtJQUN6QixNQUFNLEVBQUUsZUFBTSxDQUFDLFVBQVU7SUFDekIsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsS0FBSztJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLDBCQUEwQixDQUFDO0lBQzNDLElBQUksRUFBRSxtQkFBbUI7SUFDekIsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixhQUFhLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDN0IsT0FBTyxFQUFFO1FBQ0w7WUFDSSxRQUFRLEVBQUUsT0FBTztZQUNqQixPQUFPLEVBQUUsU0FBUztTQUNyQjtRQUNEO1lBQ0ksUUFBUSxFQUFFLE9BQU87WUFDakIsT0FBTyxFQUFFLFFBQVE7U0FDcEI7S0FDSjtJQUNELEdBQUcsRUFBRSxDQUFDO0lBQ04sU0FBUyxFQUFFLENBQUM7SUFDWixTQUFTLEVBQUUsQ0FBQztDQUNmLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBZTtJQUMvQixZQUFJO0lBQ0o7UUFDSSxHQUFHLEVBQUUsc0NBQXNDO1FBQzNDLEtBQUssRUFBRSxNQUFNO1FBQ2IsTUFBTSxFQUFFLENBQUM7UUFDVCxHQUFHLEVBQUUsZ0JBQU8sQ0FBQyxNQUFNO1FBQ25CLE1BQU0sRUFBRSxlQUFNLENBQUMsVUFBVTtRQUN6QixLQUFLLEVBQUUsSUFBSTtRQUNYLE1BQU0sRUFBRSxLQUFLO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDM0MsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLGFBQWEsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM3QixPQUFPLEVBQUU7WUFDTDtnQkFDSSxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsT0FBTyxFQUFFLFdBQVc7YUFDdkI7U0FDSjtRQUNELEdBQUcsRUFBRSxDQUFDO1FBQ04sU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsQ0FBQztLQUNmO0NBQ0osQ0FBQztBQUVGLHdEQUF3RCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IEJ1Y2hBcnQsIFZlcmxhZyB9IGZyb20gJy4vLi4vLi4vZW50aXR5JztcbmltcG9ydCB0eXBlIHsgQnVjaERhdGEgfSBmcm9tICcuLy4uLy4uL2VudGl0eSc7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuXG5leHBvcnQgY29uc3QgYnVjaDogQnVjaERhdGEgPSB7XG4gICAgX2lkOiAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxJyxcbiAgICB0aXRlbDogJ0FscGhhJyxcbiAgICByYXRpbmc6IDQsXG4gICAgYXJ0OiBCdWNoQXJ0LkRSVUNLQVVTR0FCRSxcbiAgICB2ZXJsYWc6IFZlcmxhZy5GT09fVkVSTEFHLFxuICAgIHByZWlzOiAxMS4xLFxuICAgIHJhYmF0dDogMC4wMTEsXG4gICAgbGllZmVyYmFyOiB0cnVlLFxuICAgIGRhdHVtOiBuZXcgRGF0ZSgnMjAxOC0wMi0wMVQwMDowMDowMC4wMDBaJyksXG4gICAgaXNibjogJzAwMC0wLTAwMDAwLTAwMC0xJyxcbiAgICBob21lcGFnZTogJ2h0dHBzOi8vYWNtZS5hdC8nLFxuICAgIHNjaGxhZ3dvZXJ0ZXI6IFsnSkFWQVNDUklQVCddLFxuICAgIGF1dG9yZW46IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFjaG5hbWU6ICdBbHBoYScsXG4gICAgICAgICAgICB2b3JuYW1lOiAnQWRyaWFuYScsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hY2huYW1lOiAnQWxwaGEnLFxuICAgICAgICAgICAgdm9ybmFtZTogJ0FsZnJlZCcsXG4gICAgICAgIH0sXG4gICAgXSxcbiAgICBfX3Y6IDAsXG4gICAgY3JlYXRlZEF0OiAwLFxuICAgIHVwZGF0ZWRBdDogMCxcbn07XG5cbmV4cG9ydCBjb25zdCBidWVjaGVyOiBCdWNoRGF0YVtdID0gW1xuICAgIGJ1Y2gsXG4gICAge1xuICAgICAgICBfaWQ6ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDInLFxuICAgICAgICB0aXRlbDogJ0JldGEnLFxuICAgICAgICByYXRpbmc6IDIsXG4gICAgICAgIGFydDogQnVjaEFydC5LSU5ETEUsXG4gICAgICAgIHZlcmxhZzogVmVybGFnLkZPT19WRVJMQUcsXG4gICAgICAgIHByZWlzOiAyMi4yLFxuICAgICAgICByYWJhdHQ6IDAuMDIyLFxuICAgICAgICBsaWVmZXJiYXI6IHRydWUsXG4gICAgICAgIGRhdHVtOiBuZXcgRGF0ZSgnMjAxOC0wMi0wMlQwMDowMDowMC4wMDBaJyksXG4gICAgICAgIGlzYm46ICcwMDAtMC0wMDAwMC0wMDAtMicsXG4gICAgICAgIGhvbWVwYWdlOiAnaHR0cHM6Ly9hY21lLmJpei8nLFxuICAgICAgICBzY2hsYWd3b2VydGVyOiBbJ1RZUEVTQ1JJUFQnXSxcbiAgICAgICAgYXV0b3JlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hY2huYW1lOiAnQmV0YScsXG4gICAgICAgICAgICAgICAgdm9ybmFtZTogJ0JydW5oaWxkZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBfX3Y6IDAsXG4gICAgICAgIGNyZWF0ZWRBdDogMCxcbiAgICAgICAgdXBkYXRlZEF0OiAwLFxuICAgIH0sXG5dO1xuXG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xuIl19
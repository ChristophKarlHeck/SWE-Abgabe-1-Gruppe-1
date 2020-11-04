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
exports.users = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const { env } = process;
const { USER_PASSWORD_ENCODED } = env;
const password = USER_PASSWORD_ENCODED;
// NICHT: Set statt [], weil es fuer Set keine Suchfunktion gibt
exports.users = [
    {
        id: '20000000-0000-0000-0000-000000000001',
        username: 'admin',
        password,
        email: 'admin@acme.com',
        roles: ['admin', 'mitarbeiter', 'abteilungsleiter', 'kunde'],
    },
    {
        id: '20000000-0000-0000-0000-000000000002',
        username: 'adriana.alpha',
        password,
        email: 'adriana.alpha@acme.com',
        roles: ['admin', 'mitarbeiter', 'kunde'],
    },
    {
        id: '20000000-0000-0000-0000-000000000003',
        username: 'alfred.alpha',
        password,
        email: 'alfred.alpha@acme.com',
        roles: ['mitarbeiter', 'kunde'],
    },
    {
        id: '20000000-0000-0000-0000-000000000004',
        username: 'antonia.alpha',
        password,
        email: 'antonia.alpha@acme.com',
        roles: ['mitarbeiter', 'kunde'],
    },
    {
        id: '20000000-0000-0000-0000-000000000005',
        username: 'dirk.delta',
        password,
        email: 'dirk.delta@acme.com',
        roles: ['kunde'],
    },
    {
        id: '20000000-0000-0000-0000-000000000006',
        username: 'emilia.epsilon',
        password,
        email: 'emilia.epsilon@acme.com',
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9zZXJ2aWNlL3VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7QUFHSCw0REFBNEI7QUFFNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQ3hCLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUN0QyxNQUFNLFFBQVEsR0FBRyxxQkFBK0IsQ0FBQztBQUVqRCxnRUFBZ0U7QUFDbkQsUUFBQSxLQUFLLEdBQVc7SUFDekI7UUFDSSxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVE7UUFDUixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO0tBQy9EO0lBQ0Q7UUFDSSxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVE7UUFDUixLQUFLLEVBQUUsd0JBQXdCO1FBQy9CLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDO0tBQzNDO0lBQ0Q7UUFDSSxFQUFFLEVBQUUsc0NBQXNDO1FBQzFDLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVE7UUFDUixLQUFLLEVBQUUsdUJBQXVCO1FBQzlCLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7S0FDbEM7SUFDRDtRQUNJLEVBQUUsRUFBRSxzQ0FBc0M7UUFDMUMsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUTtRQUNSLEtBQUssRUFBRSx3QkFBd0I7UUFDL0IsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztLQUNsQztJQUNEO1FBQ0ksRUFBRSxFQUFFLHNDQUFzQztRQUMxQyxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRO1FBQ1IsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbkI7SUFDRDtRQUNJLEVBQUUsRUFBRSxzQ0FBc0M7UUFDMUMsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRO1FBQ1IsS0FBSyxFQUFFLHlCQUF5QjtLQUNuQztDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDIwIC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgdHlwZSB7IFVzZXIgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoKTtcbmNvbnN0IHsgZW52IH0gPSBwcm9jZXNzO1xuY29uc3QgeyBVU0VSX1BBU1NXT1JEX0VOQ09ERUQgfSA9IGVudjtcbmNvbnN0IHBhc3N3b3JkID0gVVNFUl9QQVNTV09SRF9FTkNPREVEIGFzIHN0cmluZztcblxuLy8gTklDSFQ6IFNldCBzdGF0dCBbXSwgd2VpbCBlcyBmdWVyIFNldCBrZWluZSBTdWNoZnVua3Rpb24gZ2lidFxuZXhwb3J0IGNvbnN0IHVzZXJzOiBVc2VyW10gPSBbXG4gICAge1xuICAgICAgICBpZDogJzIwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMScsXG4gICAgICAgIHVzZXJuYW1lOiAnYWRtaW4nLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgZW1haWw6ICdhZG1pbkBhY21lLmNvbScsXG4gICAgICAgIHJvbGVzOiBbJ2FkbWluJywgJ21pdGFyYmVpdGVyJywgJ2FidGVpbHVuZ3NsZWl0ZXInLCAna3VuZGUnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICcyMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDInLFxuICAgICAgICB1c2VybmFtZTogJ2FkcmlhbmEuYWxwaGEnLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgZW1haWw6ICdhZHJpYW5hLmFscGhhQGFjbWUuY29tJyxcbiAgICAgICAgcm9sZXM6IFsnYWRtaW4nLCAnbWl0YXJiZWl0ZXInLCAna3VuZGUnXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICcyMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDMnLFxuICAgICAgICB1c2VybmFtZTogJ2FsZnJlZC5hbHBoYScsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICBlbWFpbDogJ2FsZnJlZC5hbHBoYUBhY21lLmNvbScsXG4gICAgICAgIHJvbGVzOiBbJ21pdGFyYmVpdGVyJywgJ2t1bmRlJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnMjAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDA0JyxcbiAgICAgICAgdXNlcm5hbWU6ICdhbnRvbmlhLmFscGhhJyxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIGVtYWlsOiAnYW50b25pYS5hbHBoYUBhY21lLmNvbScsXG4gICAgICAgIHJvbGVzOiBbJ21pdGFyYmVpdGVyJywgJ2t1bmRlJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnMjAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDA1JyxcbiAgICAgICAgdXNlcm5hbWU6ICdkaXJrLmRlbHRhJyxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIGVtYWlsOiAnZGlyay5kZWx0YUBhY21lLmNvbScsXG4gICAgICAgIHJvbGVzOiBbJ2t1bmRlJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnMjAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDA2JyxcbiAgICAgICAgdXNlcm5hbWU6ICdlbWlsaWEuZXBzaWxvbicsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICBlbWFpbDogJ2VtaWxpYS5lcHNpbG9uQGFjbWUuY29tJyxcbiAgICB9LFxuXTtcbiJdfQ==
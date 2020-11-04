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
exports.RoleService = void 0;
const tslib_1 = require("tslib");
const json5_1 = tslib_1.__importDefault(require("json5"));
const shared_1 = require("../../shared");
const roles_1 = require("./roles");
class RoleService {
    constructor() {
        shared_1.logger.info(`RoleService: roles=${json5_1.default.stringify(roles_1.roles)}`);
    }
    findAllRoles() {
        return roles_1.roles;
    }
    getNormalizedRoles(rollen) {
        if (rollen.length === 0) {
            shared_1.logger.debug('RolesService.getNormalizedRoles(): []');
            return [];
        }
        const normalizedRoles = rollen.filter((r) => this.getNormalizedRole(r) !== undefined);
        shared_1.logger.debug(`RolesService.getNormalizedRoles(): ${json5_1.default.stringify(normalizedRoles)}`);
        return normalizedRoles;
    }
    getNormalizedRole(role) {
        if (role === undefined) {
            return;
        }
        // Falls der Rollenname in Grossbuchstaben geschrieben ist, wird er
        // trotzdem gefunden
        return this.findAllRoles().find((r) => r.toLowerCase() === role.toLowerCase());
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc2VydmljZS9yb2xlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILDBEQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMsbUNBQWdDO0FBRWhDLE1BQWEsV0FBVztJQUNwQjtRQUNJLGVBQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLGVBQUssQ0FBQyxTQUFTLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxhQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQXVDO1FBQ3RELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsZUFBTSxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FDckMsQ0FBQztRQUNkLGVBQU0sQ0FBQyxLQUFLLENBQ1Isc0NBQXNDLGVBQUssQ0FBQyxTQUFTLENBQ2pELGVBQWUsQ0FDbEIsRUFBRSxDQUNOLENBQUM7UUFDRixPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRU8saUJBQWlCLENBQUMsSUFBd0I7UUFDOUMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU87U0FDVjtRQUVELG1FQUFtRTtRQUNuRSxvQkFBb0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUMzQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDaEQsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXJDRCxrQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IHJvbGVzIH0gZnJvbSAnLi9yb2xlcyc7XG5cbmV4cG9ydCBjbGFzcyBSb2xlU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKGBSb2xlU2VydmljZTogcm9sZXM9JHtKU09ONS5zdHJpbmdpZnkocm9sZXMpfWApO1xuICAgIH1cblxuICAgIGZpbmRBbGxSb2xlcygpIHtcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xuICAgIH1cblxuICAgIGdldE5vcm1hbGl6ZWRSb2xlcyhyb2xsZW46IHJlYWRvbmx5IChzdHJpbmcgfCB1bmRlZmluZWQpW10pIHtcbiAgICAgICAgaWYgKHJvbGxlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUm9sZXNTZXJ2aWNlLmdldE5vcm1hbGl6ZWRSb2xlcygpOiBbXScpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFJvbGVzID0gcm9sbGVuLmZpbHRlcihcbiAgICAgICAgICAgIChyKSA9PiB0aGlzLmdldE5vcm1hbGl6ZWRSb2xlKHIpICE9PSB1bmRlZmluZWQsXG4gICAgICAgICkgYXMgc3RyaW5nW107XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBSb2xlc1NlcnZpY2UuZ2V0Tm9ybWFsaXplZFJvbGVzKCk6ICR7SlNPTjUuc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRSb2xlcyxcbiAgICAgICAgICAgICl9YCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSb2xlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5vcm1hbGl6ZWRSb2xlKHJvbGU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocm9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxscyBkZXIgUm9sbGVubmFtZSBpbiBHcm9zc2J1Y2hzdGFiZW4gZ2VzY2hyaWViZW4gaXN0LCB3aXJkIGVyXG4gICAgICAgIC8vIHRyb3R6ZGVtIGdlZnVuZGVuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbGxSb2xlcygpLmZpbmQoXG4gICAgICAgICAgICAocikgPT4gci50b0xvd2VyQ2FzZSgpID09PSByb2xlLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19
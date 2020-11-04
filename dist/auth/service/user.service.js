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
exports.UserService = void 0;
const tslib_1 = require("tslib");
const json5_1 = tslib_1.__importDefault(require("json5"));
const shared_1 = require("../../shared");
const users_1 = require("./users");
class UserService {
    constructor() {
        shared_1.logger.info(`UsersService: users=${json5_1.default.stringify(users_1.users)}`);
    }
    findByUsername(username) {
        return users_1.users.find((u) => u.username === username);
    }
    findById(id) {
        return users_1.users.find((user) => user.id === id);
    }
    findByEmail(email) {
        return users_1.users.find((user) => user.email === email);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc2VydmljZS91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILDBEQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMsbUNBQWdDO0FBVWhDLE1BQWEsV0FBVztJQUNwQjtRQUNJLGVBQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLGVBQUssQ0FBQyxTQUFTLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZ0I7UUFDM0IsT0FBTyxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxRQUFRLENBQUMsRUFBVTtRQUNmLE9BQU8sYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDckIsT0FBTyxhQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDSjtBQWhCRCxrQ0FnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IHVzZXJzIH0gZnJvbSAnLi91c2Vycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICByb2xlcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhgVXNlcnNTZXJ2aWNlOiB1c2Vycz0ke0pTT041LnN0cmluZ2lmeSh1c2Vycyl9YCk7XG4gICAgfVxuXG4gICAgZmluZEJ5VXNlcm5hbWUodXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdXNlcnMuZmluZCgodTogVXNlcikgPT4gdS51c2VybmFtZSA9PT0gdXNlcm5hbWUpO1xuICAgIH1cblxuICAgIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJzLmZpbmQoKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICBmaW5kQnlFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB1c2Vycy5maW5kKCh1c2VyOiBVc2VyKSA9PiB1c2VyLmVtYWlsID09PSBlbWFpbCk7XG4gICAgfVxufVxuIl19
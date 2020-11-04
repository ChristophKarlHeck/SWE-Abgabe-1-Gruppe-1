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
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("./errors");
// Alternativen zu bcrypt:
//  scrypt: https://www.tarsnap.com/scrypt.html
//  Argon2: https://github.com/p-h-c/phc-winner-argon2
//  SHA-Algorithmen und PBKDF2 sind anfaelliger bei Angriffen mittels GPUs
//  http://blog.rangle.io/how-to-store-user-passwords-and-overcome-security-threats-in-2017
//  https://stormpath.com/blog/secure-password-hashing-in-node-with-argon2
const bcrypt_1 = require("bcrypt");
const shared_1 = require("../../shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const json5_1 = tslib_1.__importDefault(require("json5"));
const role_service_1 = require("./role.service");
const user_service_1 = require("./user.service");
// UUID v4: random
// https://github.com/uuidjs/uuid
const uuid_1 = require("uuid");
class AuthService {
    constructor() {
        this.roleService = new role_service_1.RoleService();
        this.userService = new user_service_1.UserService();
    }
    login(body) {
        // ein verschluesseltes Passwort fuer Testzwecke ausgeben
        // this.hashPassword('p');
        shared_1.logger.silly(`body: ${json5_1.default.stringify(body)}`);
        // req.body.username: any
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { username, password, } = body;
        shared_1.logger.silly(`username: ${username}`);
        if (username === undefined || password === undefined) {
            return;
        }
        const user = this.userService.findByUsername(username);
        shared_1.logger.debug(`user: ${json5_1.default.stringify(user)}`);
        shared_1.logger.silly(`password: ${password}`);
        if (!this.checkPassword(user, password)) {
            return;
        }
        const secretOrPrivateKey = shared_1.privateKey === undefined ? shared_1.secret : shared_1.privateKey;
        const options = {
            // spread properties
            ...shared_1.signOptions,
            subject: user === null || user === void 0 ? void 0 : user.id,
            jwtid: uuid_1.v4(),
        };
        const token = jsonwebtoken_1.sign({}, secretOrPrivateKey, options);
        const result = {
            token,
            expiresIn: options.expiresIn,
            roles: user === null || user === void 0 ? void 0 : user.roles,
        };
        shared_1.logger.debug(`AuthService.login(): result=${json5_1.default.stringify(result)}`);
        return result;
    }
    // Error gemaess OAuth 2: TokenExpiredError und JsonWebTokenError
    // https://tools.ietf.org/html/rfc6749#section-5.2
    // https://tools.ietf.org/html/rfc6750#section-3.1
    validateJwt(req) {
        // Authorization   Bearer ...
        // https://tools.ietf.org/html/rfc7230
        // http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
        const { token } = req;
        // Keine "Timing Attack" durch zeichenweises Vergleichen, wenn
        // unterschiedliche Antwortzeiten bei 403 entstehen
        // https://snyk.io/blog/node-js-timing-attack-ccc-ctf
        // Eine von Error abgeleitete Klasse hat die Property "message"
        // eslint-disable-next-line security/detect-possible-timing-attacks
        if (token === undefined) {
            shared_1.logger.silly('AuthService.validateJwt(): Fehler beim Header-Field Authorization');
            throw new errors_1.AuthorizationInvalidError('Fehler beim Header-Field Authorization');
        }
        shared_1.logger.silly(`AuthService.validateJwt(): token = ${token}`);
        const decoded = jsonwebtoken_1.verify(token, shared_1.secretOrPublicKey, shared_1.verifyOptions);
        shared_1.logger.debug('AuthService.validateJwt(): Der JWT-Token wurde decodiert: ' +
            `${json5_1.default.stringify(decoded)}`);
        // Destructuring fuer sub(ject): decoded ist vom Typ "object | string"
        const tmpDecoded = decoded;
        const { sub } = tmpDecoded;
        shared_1.logger.debug(`AuthService.validateJwt(): sub: ${sub}`);
        const user = this.userService.findById(sub);
        if (user === undefined) {
            shared_1.logger.silly(`AuthService.validateJwt(): Falsche User-Id: ${sub}`);
            throw new errors_1.TokenInvalidError(`Falsche User-Id: ${sub}`);
        }
        // Request-Objekt um user erweitern:
        // fuer die spaetere Ermittlung der Rollen nutzen
        req.user = user;
    }
    // bereits erledigt durch Validierung des Tokens
    // Basic Authentifizierung: ueberladen bzw. neu implementieren
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoggedIn(_) {
        shared_1.logger.debug('AuthService.isLoggedIn(): ok');
        return true;
    }
    hasAnyRole(req, roles) {
        const rolesNormalized = this.roleService.getNormalizedRoles(roles);
        const result = this.userHasAnyRole(req.user, rolesNormalized);
        shared_1.logger.debug(`AuthService.hasAnyRole(): ${result}`);
        return result;
    }
    userHasAnyRole(user, roles) {
        if (user === undefined || user.roles === undefined) {
            return false;
        }
        if (roles.length === 0) {
            return true;
        }
        const userRoles = user.roles;
        return roles.filter((role) => userRoles.includes(role)).length !== 0;
    }
    checkPassword(user, password) {
        if (user === undefined) {
            shared_1.logger.debug('AuthService.checkPassword(): Kein User-Objekt');
            return false;
        }
        // Beispiel:
        //  $2a$12$50nIBzoTSmFEDGI8nM2iYOO66WNdLKq6Zzhrswo6p1MBmkER5O/CO
        //  $ als Separator
        //  2a: Version von bcrypt
        //  12: 2**12 Iterationen
        //  die ersten 22 Zeichen kodieren einen 16-Byte Wert fuer den Salt
        //  danach das chiffrierte Passwort
        const result = bcrypt_1.compareSync(password, user.password);
        shared_1.logger.debug(`AuthService.checkPassword(): ${result}`);
        return result;
    }
    hashPassword(password) {
        const salt = bcrypt_1.genSaltSync();
        const hash = bcrypt_1.hashSync(password, salt);
        shared_1.logger.warn(`Verschluesseltes Password: ${hash}`);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc2VydmljZS9hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILHFDQUF3RTtBQUN4RSwwQkFBMEI7QUFDMUIsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCwwRUFBMEU7QUFDMUUsMkZBQTJGO0FBQzNGLDBFQUEwRTtBQUMxRSxtQ0FBNEQ7QUFDNUQseUNBT3NCO0FBQ3RCLCtDQUE0QztBQUM1QywwREFBMEI7QUFFMUIsaURBQTZDO0FBRzdDLGlEQUE2QztBQUM3QyxrQkFBa0I7QUFDbEIsaUNBQWlDO0FBQ2pDLCtCQUFrQztBQVFsQyxNQUFhLFdBQVc7SUFBeEI7UUFDcUIsZ0JBQVcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUVoQyxnQkFBVyxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO0lBK0lyRCxDQUFDO0lBN0lHLEtBQUssQ0FBQyxJQUFTO1FBQ1gseURBQXlEO1FBQ3pELDBCQUEwQjtRQUUxQixlQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MseUJBQXlCO1FBQ3pCLG1FQUFtRTtRQUNuRSxNQUFNLEVBQ0YsUUFBUSxFQUNSLFFBQVEsR0FDWCxHQUdHLElBQUksQ0FBQztRQUNULGVBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ2xELE9BQU87U0FDVjtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELGVBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxlQUFLLENBQUMs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QUFDLEtBQUssQ0FBQyxnQ0FBZ0MsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLG9CQUFXLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxpQkFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxlQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSjtBQWxKRCxrQ0FrSkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG5pbXBvcnQgeyBBdXRob3JpemF0aW9uSW52YWxpZEVycm9yLCBUb2tlbkludmFsaWRFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbi8vIEFsdGVybmF0aXZlbiB6dSBiY3J5cHQ6XG4vLyAgc2NyeXB0OiBodHRwczovL3d3dy50YXJzbmFwLmNvbS9zY3J5cHQuaHRtbFxuLy8gIEFyZ29uMjogaHR0cHM6Ly9naXRodWIuY29tL3AtaC1jL3BoYy13aW5uZXItYXJnb24yXG4vLyAgU0hBLUFsZ29yaXRobWVuIHVuZCBQQktERjIgc2luZCBhbmZhZWxsaWdlciBiZWkgQW5ncmlmZmVuIG1pdHRlbHMgR1BVc1xuLy8gIGh0dHA6Ly9ibG9nLnJhbmdsZS5pby9ob3ctdG8tc3RvcmUtdXNlci1wYXNzd29yZHMtYW5kLW92ZXJjb21lLXNlY3VyaXR5LXRocmVhdHMtaW4tMjAxN1xuLy8gIGh0dHBzOi8vc3Rvcm1wYXRoLmNvbS9ibG9nL3NlY3VyZS1wYXNzd29yZC1oYXNoaW5nLWluLW5vZGUtd2l0aC1hcmdvbjJcbmltcG9ydCB7IGNvbXBhcmVTeW5jLCBnZW5TYWx0U3luYywgaGFzaFN5bmMgfSBmcm9tICdiY3J5cHQnO1xuaW1wb3J0IHtcbiAgICBsb2dnZXIsXG4gICAgcHJpdmF0ZUtleSxcbiAgICBzZWNyZXQsXG4gICAgc2VjcmV0T3JQdWJsaWNLZXksXG4gICAgc2lnbk9wdGlvbnMsXG4gICAgdmVyaWZ5T3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IHNpZ24sIHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSb2xlU2VydmljZSB9IGZyb20gJy4vcm9sZS5zZXJ2aWNlJztcbmltcG9ydCB0eXBlIHsgU2lnbk9wdGlvbnMgfSBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHR5cGUgeyBVc2VyIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG4vLyBVVUlEIHY0OiByYW5kb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZFxuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbnRlcmZhY2UgTG9naW5SZXN1bHQge1xuICAgIHRva2VuOiBzdHJpbmc7XG4gICAgZXhwaXJlc0luOiBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgcm9sZXM/OiByZWFkb25seSBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvbGVTZXJ2aWNlID0gbmV3IFJvbGVTZXJ2aWNlKCk7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKCk7XG5cbiAgICBsb2dpbihib2R5OiBhbnkpIHtcbiAgICAgICAgLy8gZWluIHZlcnNjaGx1ZXNzZWx0ZXMgUGFzc3dvcnQgZnVlciBUZXN0endlY2tlIGF1c2dlYmVuXG4gICAgICAgIC8vIHRoaXMuaGFzaFBhc3N3b3JkKCdwJyk7XG5cbiAgICAgICAgbG9nZ2VyLnNpbGx5KGBib2R5OiAke0pTT041LnN0cmluZ2lmeShib2R5KX1gKTtcbiAgICAgICAgLy8gcmVxLmJvZHkudXNlcm5hbWU6IGFueVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIH06IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBwYXNzd29yZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICB9ID0gYm9keTtcbiAgICAgICAgbG9nZ2VyLnNpbGx5KGB1c2VybmFtZTogJHt1c2VybmFtZX1gKTtcbiAgICAgICAgaWYgKHVzZXJuYW1lID09PSB1bmRlZmluZWQgfHwgcGFzc3dvcmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLnVzZXJTZXJ2aWNlLmZpbmRCeVVzZXJuYW1lKHVzZXJuYW1lKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGB1c2VyOiAke0pTT041LnN0cmluZ2lmeSh1c2VyKX1gKTtcblxuICAgICAgICBsb2dnZXIuc2lsbHkoYHBhc3N3b3JkOiAke3Bhc3N3b3JkfWApO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tQYXNzd29yZCh1c2VyLCBwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlY3JldE9yUHJpdmF0ZUtleSA9XG4gICAgICAgICAgICBwcml2YXRlS2V5ID09PSB1bmRlZmluZWQgPyBzZWNyZXQgOiBwcml2YXRlS2V5O1xuICAgICAgICBjb25zdCBvcHRpb25zOiBTaWduT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC8vIHNwcmVhZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAuLi5zaWduT3B0aW9ucyxcbiAgICAgICAgICAgIHN1YmplY3Q6IHVzZXI/LmlkLFxuICAgICAgICAgICAgand0aWQ6IHV1aWQoKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBzaWduKHt9LCBzZWNyZXRPclByaXZhdGVLZXksIG9wdGlvbnMpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogTG9naW5SZXN1bHQgPSB7XG4gICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgIGV4cGlyZXNJbjogb3B0aW9ucy5leHBpcmVzSW4sXG4gICAgICAgICAgICByb2xlczogdXNlcj8ucm9sZXMsXG4gICAgICAgIH07XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQXV0aFNlcnZpY2UubG9naW4oKTogcmVzdWx0PSR7SlNPTjUuc3RyaW5naWZ5KHJlc3VsdCl9YCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gRXJyb3IgZ2VtYWVzcyBPQXV0aCAyOiBUb2tlbkV4cGlyZWRFcnJvciB1bmQgSnNvbldlYlRva2VuRXJyb3JcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzUwI3NlY3Rpb24tMy4xXG4gICAgdmFsaWRhdGVKd3QocmVxOiBSZXF1ZXN0KSB7XG4gICAgICAgIC8vIEF1dGhvcml6YXRpb24gICBCZWFyZXIgLi4uXG4gICAgICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwXG4gICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1Byb3RvY29scy9yZmMyNjE2L3JmYzI2MTYtc2VjNC5odG1sI3NlYzQuMlxuICAgICAgICBjb25zdCB7IHRva2VuIH0gPSByZXE7XG5cbiAgICAgICAgLy8gS2VpbmUgXCJUaW1pbmcgQXR0YWNrXCIgZHVyY2ggemVpY2hlbndlaXNlcyBWZXJnbGVpY2hlbiwgd2VublxuICAgICAgICAvLyB1bnRlcnNjaGllZGxpY2hlIEFudHdvcnR6ZWl0ZW4gYmVpIDQwMyBlbnRzdGVoZW5cbiAgICAgICAgLy8gaHR0cHM6Ly9zbnlrLmlvL2Jsb2cvbm9kZS1qcy10aW1pbmctYXR0YWNrLWNjYy1jdGZcbiAgICAgICAgLy8gRWluZSB2b24gRXJyb3IgYWJnZWxlaXRldGUgS2xhc3NlIGhhdCBkaWUgUHJvcGVydHkgXCJtZXNzYWdlXCJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHNlY3VyaXR5L2RldGVjdC1wb3NzaWJsZS10aW1pbmctYXR0YWNrc1xuICAgICAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLnNpbGx5KFxuICAgICAgICAgICAgICAgICdBdXRoU2VydmljZS52YWxpZGF0ZUp3dCgpOiBGZWhsZXIgYmVpbSBIZWFkZXItRmllbGQgQXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhvcml6YXRpb25JbnZhbGlkRXJyb3IoXG4gICAgICAgICAgICAgICAgJ0ZlaGxlciBiZWltIEhlYWRlci1GaWVsZCBBdXRob3JpemF0aW9uJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLnNpbGx5KGBBdXRoU2VydmljZS52YWxpZGF0ZUp3dCgpOiB0b2tlbiA9ICR7dG9rZW59YCk7XG5cbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IHZlcmlmeSh0b2tlbiwgc2VjcmV0T3JQdWJsaWNLZXksIHZlcmlmeU9wdGlvbnMpO1xuICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAnQXV0aFNlcnZpY2UudmFsaWRhdGVKd3QoKTogRGVyIEpXVC1Ub2tlbiB3dXJkZSBkZWNvZGllcnQ6ICcgK1xuICAgICAgICAgICAgICAgIGAke0pTT041LnN0cmluZ2lmeShkZWNvZGVkKX1gLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIERlc3RydWN0dXJpbmcgZnVlciBzdWIoamVjdCk6IGRlY29kZWQgaXN0IHZvbSBUeXAgXCJvYmplY3QgfCBzdHJpbmdcIlxuICAgICAgICBjb25zdCB0bXBEZWNvZGVkOiB1bmtub3duID0gZGVjb2RlZDtcbiAgICAgICAgY29uc3QgeyBzdWIgfSA9IHRtcERlY29kZWQgYXMgeyBzdWI6IHN0cmluZyB9O1xuICAgICAgICBsb2dnZXIuZGVidWcoYEF1dGhTZXJ2aWNlLnZhbGlkYXRlSnd0KCk6IHN1YjogJHtzdWJ9YCk7XG5cbiAgICAgICAgY29uc3QgdXNlciA9IHRoaXMudXNlclNlcnZpY2UuZmluZEJ5SWQoc3ViKTtcbiAgICAgICAgaWYgKHVzZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbG9nZ2VyLnNpbGx5KGBBdXRoU2VydmljZS52YWxpZGF0ZUp3dCgpOiBGYWxzY2hlIFVzZXItSWQ6ICR7c3VifWApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFRva2VuSW52YWxpZEVycm9yKGBGYWxzY2hlIFVzZXItSWQ6ICR7c3VifWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVxdWVzdC1PYmpla3QgdW0gdXNlciBlcndlaXRlcm46XG4gICAgICAgIC8vIGZ1ZXIgZGllIHNwYWV0ZXJlIEVybWl0dGx1bmcgZGVyIFJvbGxlbiBudXR6ZW5cbiAgICAgICAgKHJlcSBhcyBhbnkpLnVzZXIgPSB1c2VyO1xuICAgIH1cblxuICAgIC8vIGJlcmVpdHMgZXJsZWRpZ3QgZHVyY2ggVmFsaWRpZXJ1bmcgZGVzIFRva2Vuc1xuICAgIC8vIEJhc2ljIEF1dGhlbnRpZml6aWVydW5nOiB1ZWJlcmxhZGVuIGJ6dy4gbmV1IGltcGxlbWVudGllcmVuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgIGlzTG9nZ2VkSW4oXzogUmVxdWVzdCkge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhTZXJ2aWNlLmlzTG9nZ2VkSW4oKTogb2snKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaGFzQW55Um9sZShyZXE6IFJlcXVlc3QsIHJvbGVzOiByZWFkb25seSBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCByb2xlc05vcm1hbGl6ZWQgPSB0aGlzLnJvbGVTZXJ2aWNlLmdldE5vcm1hbGl6ZWRSb2xlcyhyb2xlcyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudXNlckhhc0FueVJvbGUoKHJlcSBhcyBhbnkpLnVzZXIsIHJvbGVzTm9ybWFsaXplZCk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgQXV0aFNlcnZpY2UuaGFzQW55Um9sZSgpOiAke3Jlc3VsdH1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB1c2VySGFzQW55Um9sZSh1c2VyOiBVc2VyIHwgdW5kZWZpbmVkLCByb2xlczogcmVhZG9ubHkgc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKHVzZXIgPT09IHVuZGVmaW5lZCB8fCB1c2VyLnJvbGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJSb2xlcyA9IHVzZXIucm9sZXM7XG4gICAgICAgIHJldHVybiByb2xlcy5maWx0ZXIoKHJvbGUpID0+IHVzZXJSb2xlcy5pbmNsdWRlcyhyb2xlKSkubGVuZ3RoICE9PSAwO1xuICAgIH1cblxuICAgIGNoZWNrUGFzc3dvcmQodXNlcjogVXNlciB8IHVuZGVmaW5lZCwgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgICAgICBpZiAodXNlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhTZXJ2aWNlLmNoZWNrUGFzc3dvcmQoKTogS2VpbiBVc2VyLU9iamVrdCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmVpc3BpZWw6XG4gICAgICAgIC8vICAkMmEkMTIkNTBuSUJ6b1RTbUZFREdJOG5NMmlZT082NldOZExLcTZaemhyc3dvNnAxTUJta0VSNU8vQ09cbiAgICAgICAgLy8gICQgYWxzIFNlcGFyYXRvclxuICAgICAgICAvLyAgMmE6IFZlcnNpb24gdm9uIGJjcnlwdFxuICAgICAgICAvLyAgMTI6IDIqKjEyIEl0ZXJhdGlvbmVuXG4gICAgICAgIC8vICBkaWUgZXJzdGVuIDIyIFplaWNoZW4ga29kaWVyZW4gZWluZW4gMTYtQnl0ZSBXZXJ0IGZ1ZXIgZGVuIFNhbHRcbiAgICAgICAgLy8gIGRhbmFjaCBkYXMgY2hpZmZyaWVydGUgUGFzc3dvcnRcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gY29tcGFyZVN5bmMocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICBsb2dnZXIuZGVidWcoYEF1dGhTZXJ2aWNlLmNoZWNrUGFzc3dvcmQoKTogJHtyZXN1bHR9YCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaGFzaFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2FsdCA9IGdlblNhbHRTeW5jKCk7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBoYXNoU3luYyhwYXNzd29yZCwgc2FsdCk7XG4gICAgICAgIGxvZ2dlci53YXJuKGBWZXJzY2hsdWVzc2VsdGVzIFBhc3N3b3JkOiAke2hhc2h9YCk7XG4gICAgfVxufVxuIl19
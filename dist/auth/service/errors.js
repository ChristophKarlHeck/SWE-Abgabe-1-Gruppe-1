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
exports.TokenInvalidError = exports.AuthorizationInvalidError = void 0;
/* eslint-disable max-classes-per-file */
// Statt JWT (nahezu) komplett zu implementieren, koennte man z.B. Passport
// verwenden
const shared_1 = require("../../shared");
// http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript#answer-5251506
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error
class AuthorizationInvalidError extends Error {
    constructor(message) {
        super(message);
        shared_1.logger.silly('AuthorizationInvalidError.constructor()');
        this.name = 'AuthorizationInvalidError';
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.AuthorizationInvalidError = AuthorizationInvalidError;
class TokenInvalidError extends Error {
    constructor(message) {
        super(message);
        shared_1.logger.silly('TokenInvalidError.constructor()');
        this.name = 'TokenInvalidError';
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.TokenInvalidError = TokenInvalidError;
/* eslint-enable max-classes-per-file */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc2VydmljZS9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBRUgseUNBQXlDO0FBRXpDLDJFQUEyRTtBQUMzRSxZQUFZO0FBQ1oseUNBQXNDO0FBRXRDLDJHQUEyRztBQUMzRyxzRkFBc0Y7QUFFdEYsTUFBYSx5QkFBMEIsU0FBUSxLQUFLO0lBQ2hELFlBQVksT0FBZTtRQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixlQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRywyQkFBMkIsQ0FBQztRQUN4QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0o7QUFSRCw4REFRQztBQUVELE1BQWEsaUJBQWtCLFNBQVEsS0FBSztJQUN4QyxZQUFZLE9BQWU7UUFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsZUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKO0FBUkQsOENBUUM7QUFFRCx3Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG4vLyBTdGF0dCBKV1QgKG5haGV6dSkga29tcGxldHQgenUgaW1wbGVtZW50aWVyZW4sIGtvZW5udGUgbWFuIHouQi4gUGFzc3BvcnRcbi8vIHZlcndlbmRlblxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkJztcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzgyMTA3L3doYXRzLWEtZ29vZC13YXktdG8tZXh0ZW5kLWVycm9yLWluLWphdmFzY3JpcHQjYW5zd2VyLTUyNTE1MDZcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RlL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yXG5cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uSW52YWxpZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgbG9nZ2VyLnNpbGx5KCdBdXRob3JpemF0aW9uSW52YWxpZEVycm9yLmNvbnN0cnVjdG9yKCknKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0F1dGhvcml6YXRpb25JbnZhbGlkRXJyb3InO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2tlbkludmFsaWRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIGxvZ2dlci5zaWxseSgnVG9rZW5JbnZhbGlkRXJyb3IuY29uc3RydWN0b3IoKScpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVG9rZW5JbnZhbGlkRXJyb3InO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzKTtcbiAgICB9XG59XG5cbi8qIGVzbGludC1lbmFibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbiJdfQ==
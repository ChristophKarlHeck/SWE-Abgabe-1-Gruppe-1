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
exports.isAdminMitarbeiter = exports.isMitarbeiter = exports.isAdmin = void 0;
const tslib_1 = require("tslib");
const shared_1 = require("../../shared");
const service_1 = require("../service");
const json5_1 = tslib_1.__importDefault(require("json5"));
class AuthorizationRequestHandler {
    constructor() {
        this.authService = new service_1.AuthService();
    }
    isAdmin(req, res, next) {
        if (!this.hasRolle(req, res, 'admin')) {
            shared_1.logger.debug('AuthRequestHandler.isAdmin(): false');
            return;
        }
        shared_1.logger.debug('AuthRequestHandler.isAdmin(): ok');
        // Verarbeitung fortsetzen
        next();
    }
    isMitarbeiter(req, res, next) {
        if (!this.hasRolle(req, res, 'mitarbeiter')) {
            shared_1.logger.debug('AuthRequestHandler.isMitarbeiter(): false');
            return;
        }
        shared_1.logger.debug('AuthRequestHandler.isMitarbeiter(): ok');
        // Verarbeitung fortsetzen
        next();
    }
    isAdminMitarbeiter(req, res, next) {
        if (!this.hasRolle(req, res, 'admin', 'mitarbeiter')) {
            shared_1.logger.debug('AuthRequestHandler.isAdminMitarbeiter(): false');
            return;
        }
        shared_1.logger.debug('AuthRequestHandler.isAdminMitarbeiter(): ok');
        // Verarbeitung fortsetzen
        next();
    }
    // Spread-Parameter
    hasRolle(req, res, ...roles) {
        shared_1.logger.debug(`Rollen = ${json5_1.default.stringify(roles)}`);
        if (!this.authService.isLoggedIn(req)) {
            shared_1.logger.debug('AuthRequestHandler.hasRolle(): 401');
            res.sendStatus(shared_1.HttpStatus.UNAUTHORIZED);
            return false;
        }
        if (!this.authService.hasAnyRole(req, roles)) {
            shared_1.logger.debug('AuthRequestHandler.hasRolle(): 403');
            shared_1.logger.debug('403');
            res.sendStatus(shared_1.HttpStatus.FORBIDDEN);
            return false;
        }
        shared_1.logger.debug('AuthRequestHandler.hasRolle(): ok');
        return true;
    }
}
const handler = new AuthorizationRequestHandler();
const isAdmin = (req, res, next) => handler.isAdmin(req, res, next);
exports.isAdmin = isAdmin;
const isMitarbeiter = (req, res, next) => handler.isMitarbeiter(req, res, next);
exports.isMitarbeiter = isMitarbeiter;
const isAdminMitarbeiter = (req, res, next) => handler.isAdminMitarbeiter(req, res, next);
exports.isAdminMitarbeiter = isAdminMitarbeiter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbi5yZXF1ZXN0LWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9yZXN0L2F1dGhvcml6YXRpb24ucmVxdWVzdC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7Ozs7QUFFSCx5Q0FBa0Q7QUFFbEQsd0NBQXlDO0FBQ3pDLDBEQUEwQjtBQUUxQixNQUFNLDJCQUEyQjtJQUFqQztRQUNxQixnQkFBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO0lBdURyRCxDQUFDO0lBckRHLE9BQU8sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDbkMsZUFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDVjtRQUVELGVBQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUNqRCwwQkFBMEI7UUFDMUIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBRTtZQUN6QyxlQUFNLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7WUFDMUQsT0FBTztTQUNWO1FBRUQsZUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ3ZELDBCQUEwQjtRQUMxQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxFQUFFO1lBQ2xELGVBQU0sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUMvRCxPQUFPO1NBQ1Y7UUFFRCxlQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDNUQsMEJBQTBCO1FBQzFCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELG1CQUFtQjtJQUNYLFFBQVEsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEdBQUcsS0FBd0I7UUFDckUsZUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLGVBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxlQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUMxQyxlQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDbkQsZUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxlQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO0FBRTNDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUUsQ0FDdkUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRHZCLFFBQUEsT0FBTyxXQUNnQjtBQUU3QixNQUFNLGFBQWEsR0FBRyxDQUN6QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFKOUIsUUFBQSxhQUFhLGlCQUlpQjtBQUVwQyxNQUFNLGtCQUFrQixHQUFHLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBSm5DLFFBQUEsa0JBQWtCLHNCQUlpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IEh0dHBTdGF0dXMsIGxvZ2dlciB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgdHlwZSB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZSc7XG5pbXBvcnQgSlNPTjUgZnJvbSAnanNvbjUnO1xuXG5jbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYXV0aFNlcnZpY2UgPSBuZXcgQXV0aFNlcnZpY2UoKTtcblxuICAgIGlzQWRtaW4ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1JvbGxlKHJlcSwgcmVzLCAnYWRtaW4nKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdBdXRoUmVxdWVzdEhhbmRsZXIuaXNBZG1pbigpOiBmYWxzZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdBdXRoUmVxdWVzdEhhbmRsZXIuaXNBZG1pbigpOiBvaycpO1xuICAgICAgICAvLyBWZXJhcmJlaXR1bmcgZm9ydHNldHplblxuICAgICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgaXNNaXRhcmJlaXRlcihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuaGFzUm9sbGUocmVxLCByZXMsICdtaXRhcmJlaXRlcicpKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci5pc01pdGFyYmVpdGVyKCk6IGZhbHNlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci5pc01pdGFyYmVpdGVyKCk6IG9rJyk7XG4gICAgICAgIC8vIFZlcmFyYmVpdHVuZyBmb3J0c2V0emVuXG4gICAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICBpc0FkbWluTWl0YXJiZWl0ZXIocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1JvbGxlKHJlcSwgcmVzLCAnYWRtaW4nLCAnbWl0YXJiZWl0ZXInKSkge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdBdXRoUmVxdWVzdEhhbmRsZXIuaXNBZG1pbk1pdGFyYmVpdGVyKCk6IGZhbHNlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci5pc0FkbWluTWl0YXJiZWl0ZXIoKTogb2snKTtcbiAgICAgICAgLy8gVmVyYXJiZWl0dW5nIGZvcnRzZXR6ZW5cbiAgICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIC8vIFNwcmVhZC1QYXJhbWV0ZXJcbiAgICBwcml2YXRlIGhhc1JvbGxlKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgLi4ucm9sZXM6IHJlYWRvbmx5IHN0cmluZ1tdKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhgUm9sbGVuID0gJHtKU09ONS5zdHJpbmdpZnkocm9sZXMpfWApO1xuXG4gICAgICAgIGlmICghdGhpcy5hdXRoU2VydmljZS5pc0xvZ2dlZEluKHJlcSkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnQXV0aFJlcXVlc3RIYW5kbGVyLmhhc1JvbGxlKCk6IDQwMScpO1xuICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmF1dGhTZXJ2aWNlLmhhc0FueVJvbGUocmVxLCByb2xlcykpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnQXV0aFJlcXVlc3RIYW5kbGVyLmhhc1JvbGxlKCk6IDQwMycpO1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCc0MDMnKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKEh0dHBTdGF0dXMuRk9SQklEREVOKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQXV0aFJlcXVlc3RIYW5kbGVyLmhhc1JvbGxlKCk6IG9rJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuY29uc3QgaGFuZGxlciA9IG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIoKTtcblxuZXhwb3J0IGNvbnN0IGlzQWRtaW4gPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+XG4gICAgaGFuZGxlci5pc0FkbWluKHJlcSwgcmVzLCBuZXh0KTtcblxuZXhwb3J0IGNvbnN0IGlzTWl0YXJiZWl0ZXIgPSAoXG4gICAgcmVxOiBSZXF1ZXN0LFxuICAgIHJlczogUmVzcG9uc2UsXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxuKSA9PiBoYW5kbGVyLmlzTWl0YXJiZWl0ZXIocmVxLCByZXMsIG5leHQpO1xuXG5leHBvcnQgY29uc3QgaXNBZG1pbk1pdGFyYmVpdGVyID0gKFxuICAgIHJlcTogUmVxdWVzdCxcbiAgICByZXM6IFJlc3BvbnNlLFxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcbikgPT4gaGFuZGxlci5pc0FkbWluTWl0YXJiZWl0ZXIocmVxLCByZXMsIG5leHQpO1xuIl19
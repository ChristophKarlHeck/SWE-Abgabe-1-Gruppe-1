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
exports.isLoggedIn = exports.validateJwt = exports.login = void 0;
const tslib_1 = require("tslib");
const service_1 = require("../service");
const shared_1 = require("../../shared");
const jsonwebtoken_1 = require("jsonwebtoken");
const json5_1 = tslib_1.__importDefault(require("json5"));
class AuthenticationRequestHandler {
    constructor() {
        this.authService = new service_1.AuthService();
    }
    login(req, res) {
        const loginResult = this.authService.login(req.body);
        if (loginResult === undefined) {
            shared_1.logger.debug('AuthRequestHandler.login(): 401');
            res.sendStatus(shared_1.HttpStatus.UNAUTHORIZED);
            return;
        }
        shared_1.logger.debug(`AuthRequestHandler.login(): ${json5_1.default.stringify(loginResult)}`);
        res.json(loginResult).status(shared_1.HttpStatus.OK);
    }
    validateJwt(req, res, next) {
        try {
            this.authService.validateJwt(req);
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                shared_1.logger.debug('AuthRequestHandler.validateJwt(): 401');
                res.header('WWW-Authenticate', `Bearer realm="acme.com", error="invalid_token", error_description="${err.message}"`);
                res.status(shared_1.HttpStatus.UNAUTHORIZED).send(err.message);
                return;
            }
            // message bei JsonWebTokenError:
            //  jwt malformed
            //  jwt signature is required
            //  invalid signature
            //  jwt audience invalid. expected: [OPTIONS AUDIENCE]
            //  jwt issuer invalid. expected: [OPTIONS ISSUER]
            //  jwt id invalid. expected: [OPTIONS JWT ID]
            //  jwt subject invalid
            if (err instanceof jsonwebtoken_1.JsonWebTokenError ||
                err instanceof service_1.AuthorizationInvalidError ||
                err instanceof service_1.TokenInvalidError) {
                shared_1.logger.debug(`AuthRequestHandler.validateJwt(): 401: ${err.name}, ${err.message}`);
                res.sendStatus(shared_1.HttpStatus.UNAUTHORIZED);
                return;
            }
            res.sendStatus(shared_1.HttpStatus.INTERNAL_ERROR);
            return;
        }
        shared_1.logger.debug('AuthRequestHandler.validateJwt(): ok');
        next();
    }
    isLoggedIn(req, res, next) {
        if (!this.authService.isLoggedIn(req)) {
            shared_1.logger.debug('AuthRequestHandler.isLoggedIn(): 401');
            res.sendStatus(shared_1.HttpStatus.UNAUTHORIZED);
            return;
        }
        shared_1.logger.debug('AuthRequestHandler.isLoggedIn(): ok');
        // Verarbeitung fortsetzen
        next();
    }
}
const handler = new AuthenticationRequestHandler();
const login = (req, res) => handler.login(req, res);
exports.login = login;
const validateJwt = (req, res, next) => handler.validateJwt(req, res, next);
exports.validateJwt = validateJwt;
const isLoggedIn = (req, res, next) => handler.isLoggedIn(req, res, next);
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24ucmVxdWVzdC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvcmVzdC9hdXRoZW50aWNhdGlvbi5yZXF1ZXN0LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7OztBQUVILHdDQUlvQjtBQUNwQix5Q0FBa0Q7QUFDbEQsK0NBQW9FO0FBRXBFLDBEQUEwQjtBQUUxQixNQUFNLDRCQUE0QjtJQUFsQztRQUNxQixnQkFBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO0lBc0VyRCxDQUFDO0lBcEVHLEtBQUssQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUM3QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1lBQzNCLGVBQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDeEMsT0FBTztTQUNWO1FBRUQsZUFBTSxDQUFDLEtBQUssQ0FDUiwrQkFBK0IsZUFBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUNoRSxDQUFDO1FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7UUFDdkQsSUFBSTtZQUNBLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQUMsT0FBTyxHQUFZLEVBQUU7WUFDbkIsSUFBSSxHQUFHLFlBQVksZ0NBQWlCLEVBQUU7Z0JBQ2xDLGVBQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLE1BQU0sQ0FDTixrQkFBa0IsRUFDbEIsc0VBQXNFLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FDdkYsQ0FBQztnQkFDRixHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEQsT0FBTzthQUNWO1lBRUQsaUNBQWlDO1lBQ2pDLGlCQUFpQjtZQUNqQiw2QkFBNkI7WUFDN0IscUJBQXFCO1lBQ3JCLHNEQUFzRDtZQUN0RCxrREFBa0Q7WUFDbEQsOENBQThDO1lBQzlDLHVCQUF1QjtZQUV2QixJQUNJLEdBQUcsWUFBWSxnQ0FBaUI7Z0JBQ2hDLEdBQUcsWUFBWSxtQ0FBeUI7Z0JBQ3hDLEdBQUcsWUFBWSwyQkFBaUIsRUFDbEM7Z0JBQ0UsZUFBTSxDQUFDLEtBQUssQ0FDUiwwQ0FBMEMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQ3ZFLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN4QyxPQUFPO2FBQ1Y7WUFFRCxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDMUMsT0FBTztTQUNWO1FBRUQsZUFBTSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3JELElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQyxlQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDckQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLE9BQU87U0FDVjtRQUVELGVBQU0sQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNwRCwwQkFBMEI7UUFDMUIsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLDRCQUE0QixFQUFFLENBQUM7QUFFNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUFqRSxRQUFBLEtBQUssU0FBNEQ7QUFFdkUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRSxDQUMzRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFEM0IsUUFBQSxXQUFXLGVBQ2dCO0FBRWpDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUUsQ0FDMUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRDFCLFFBQUEsVUFBVSxjQUNnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7XG4gICAgQXV0aFNlcnZpY2UsXG4gICAgQXV0aG9yaXphdGlvbkludmFsaWRFcnJvcixcbiAgICBUb2tlbkludmFsaWRFcnJvcixcbn0gZnJvbSAnLi4vc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwU3RhdHVzLCBsb2dnZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgSnNvbldlYlRva2VuRXJyb3IsIFRva2VuRXhwaXJlZEVycm9yIH0gZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB0eXBlIHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcblxuY2xhc3MgQXV0aGVudGljYXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoU2VydmljZSA9IG5ldyBBdXRoU2VydmljZSgpO1xuXG4gICAgbG9naW4ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGxvZ2luUmVzdWx0ID0gdGhpcy5hdXRoU2VydmljZS5sb2dpbihyZXEuYm9keSk7XG4gICAgICAgIGlmIChsb2dpblJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci5sb2dpbigpOiA0MDEnKTtcbiAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICAgIGBBdXRoUmVxdWVzdEhhbmRsZXIubG9naW4oKTogJHtKU09ONS5zdHJpbmdpZnkobG9naW5SZXN1bHQpfWAsXG4gICAgICAgICk7XG4gICAgICAgIHJlcy5qc29uKGxvZ2luUmVzdWx0KS5zdGF0dXMoSHR0cFN0YXR1cy5PSyk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVKd3QocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2UudmFsaWRhdGVKd3QocmVxKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVG9rZW5FeHBpcmVkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci52YWxpZGF0ZUp3dCgpOiA0MDEnKTtcbiAgICAgICAgICAgICAgICByZXMuaGVhZGVyKFxuICAgICAgICAgICAgICAgICAgICAnV1dXLUF1dGhlbnRpY2F0ZScsXG4gICAgICAgICAgICAgICAgICAgIGBCZWFyZXIgcmVhbG09XCJhY21lLmNvbVwiLCBlcnJvcj1cImludmFsaWRfdG9rZW5cIiwgZXJyb3JfZGVzY3JpcHRpb249XCIke2Vyci5tZXNzYWdlfVwiYCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpLnNlbmQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWVzc2FnZSBiZWkgSnNvbldlYlRva2VuRXJyb3I6XG4gICAgICAgICAgICAvLyAgand0IG1hbGZvcm1lZFxuICAgICAgICAgICAgLy8gIGp3dCBzaWduYXR1cmUgaXMgcmVxdWlyZWRcbiAgICAgICAgICAgIC8vICBpbnZhbGlkIHNpZ25hdHVyZVxuICAgICAgICAgICAgLy8gIGp3dCBhdWRpZW5jZSBpbnZhbGlkLiBleHBlY3RlZDogW09QVElPTlMgQVVESUVOQ0VdXG4gICAgICAgICAgICAvLyAgand0IGlzc3VlciBpbnZhbGlkLiBleHBlY3RlZDogW09QVElPTlMgSVNTVUVSXVxuICAgICAgICAgICAgLy8gIGp3dCBpZCBpbnZhbGlkLiBleHBlY3RlZDogW09QVElPTlMgSldUIElEXVxuICAgICAgICAgICAgLy8gIGp3dCBzdWJqZWN0IGludmFsaWRcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGVyciBpbnN0YW5jZW9mIEpzb25XZWJUb2tlbkVycm9yIHx8XG4gICAgICAgICAgICAgICAgZXJyIGluc3RhbmNlb2YgQXV0aG9yaXphdGlvbkludmFsaWRFcnJvciB8fFxuICAgICAgICAgICAgICAgIGVyciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEVycm9yXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICAgICAgICAgICAgIGBBdXRoUmVxdWVzdEhhbmRsZXIudmFsaWRhdGVKd3QoKTogNDAxOiAke2Vyci5uYW1lfSwgJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoSHR0cFN0YXR1cy5JTlRFUk5BTF9FUlJPUik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci52YWxpZGF0ZUp3dCgpOiBvaycpO1xuICAgICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgaXNMb2dnZWRJbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuYXV0aFNlcnZpY2UuaXNMb2dnZWRJbihyZXEpKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0F1dGhSZXF1ZXN0SGFuZGxlci5pc0xvZ2dlZEluKCk6IDQwMScpO1xuICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoSHR0cFN0YXR1cy5VTkFVVEhPUklaRUQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdBdXRoUmVxdWVzdEhhbmRsZXIuaXNMb2dnZWRJbigpOiBvaycpO1xuICAgICAgICAvLyBWZXJhcmJlaXR1bmcgZm9ydHNldHplblxuICAgICAgICBuZXh0KCk7XG4gICAgfVxufVxuXG5jb25zdCBoYW5kbGVyID0gbmV3IEF1dGhlbnRpY2F0aW9uUmVxdWVzdEhhbmRsZXIoKTtcblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4gaGFuZGxlci5sb2dpbihyZXEsIHJlcyk7XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUp3dCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT5cbiAgICBoYW5kbGVyLnZhbGlkYXRlSnd0KHJlcSwgcmVzLCBuZXh0KTtcblxuZXhwb3J0IGNvbnN0IGlzTG9nZ2VkSW4gPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+XG4gICAgaGFuZGxlci5pc0xvZ2dlZEluKHJlcSwgcmVzLCBuZXh0KTtcbiJdfQ==
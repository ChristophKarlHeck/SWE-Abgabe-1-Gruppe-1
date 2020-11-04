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
exports.verifyOptions = exports.signOptions = exports.secretOrPublicKey = exports.privateKey = exports.isHMAC = exports.secret = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
exports.secret = 'p';
// HMAC = Keyed-Hash MAC (= Message Authentication Code)
// HS256 = HMAC mit SHA-256
// Passwort (bzw. Secret) erforderlich
// Bei SHA-3 ist HMAC nicht mehr notwendig.
// SHA-3 ist bei bei den Algorithmen fuer JWT *NICHT* aufgelistet:
// https://tools.ietf.org/html/rfc7518
// const algorithm = 'HS256';
// RSA von Ron Rivest, Adi Shamir, Leonard Adleman
// RSA impliziert einen privaten und einen oeffentlichen Schluessel
// RS256 = RSA mit SHA-256 (verwendet u.a. von Google)
const algorithm = 'RS256';
// ECDSA = Elliptic Curve Digital Signature Algorithm
// elliptische Kurven, z.B. y^2 = x^3 + ax + b
// ECDSA hat bei gleicher Sicherheit deutlich kuerzere Schluessel, benoetigt
// aber mehr Rechenleistung. Die Schluessel werden *nicht* uebertragen!
// http://jwt.io kann nur HS256 und RS256
// const algorithm = 'ES384';
// RSASSA-PSS
// const algorithm = 'PS256';
const isHMAC = () => algorithm.startsWith('HS');
exports.isHMAC = isHMAC;
/* global __dirname */
const jwtDir = path_1.resolve(__dirname, 'jwt');
const utf8 = 'utf8';
if (algorithm.startsWith('HS')) {
    exports.privateKey = undefined;
}
else if (algorithm.startsWith('ES')) {
    // PEM-Datei fuer elliptische Kurve durch z.B. OpenSSL
    exports.privateKey = fs_1.readFileSync(path_1.resolve(jwtDir, 'ecdsa.pem'), utf8);
}
else {
    // default (z.B. RS256) PEM-Datei durch z.B. OpenSSL
    exports.privateKey = fs_1.readFileSync(path_1.resolve(jwtDir, 'rsa.pem'), utf8);
}
if (algorithm.startsWith('HS')) {
    exports.secretOrPublicKey = exports.secret;
}
else if (algorithm.startsWith('ES')) {
    exports.secretOrPublicKey = fs_1.readFileSync(path_1.resolve(jwtDir, 'ecdsa.public.pem'), utf8);
}
else {
    // z.B. RS256
    exports.secretOrPublicKey = fs_1.readFileSync(path_1.resolve(jwtDir, 'rsa.public.pem'), utf8);
}
const issuer = 'https://acme.com/shop/JuergenZimmermann';
// sub(ject) und jti (= JWT Id) muessen individuell gesetzt werden
exports.signOptions = {
    // shorthand property
    algorithm,
    expiresIn: '1d',
    // ggf. als DN (= distinguished name) gemaess LDAP
    issuer,
};
exports.verifyOptions = {
    algorithms: [algorithm],
    issuer,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb25maWcvand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUdILDJCQUFrQztBQUNsQywrQkFBK0I7QUFFbEIsUUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBRTFCLHdEQUF3RDtBQUN4RCwyQkFBMkI7QUFDM0Isc0NBQXNDO0FBQ3RDLDJDQUEyQztBQUMzQyxrRUFBa0U7QUFDbEUsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixrREFBa0Q7QUFDbEQsbUVBQW1FO0FBQ25FLHNEQUFzRDtBQUN0RCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFFMUIscURBQXFEO0FBQ3JELDhDQUE4QztBQUM5Qyw0RUFBNEU7QUFDNUUsdUVBQXVFO0FBQ3ZFLHlDQUF5QztBQUN6Qyw2QkFBNkI7QUFFN0IsYUFBYTtBQUNiLDZCQUE2QjtBQUV0QixNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQTFDLFFBQUEsTUFBTSxVQUFvQztBQUV2RCxzQkFBc0I7QUFDdEIsTUFBTSxNQUFNLEdBQUcsY0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUM7QUFHcEIsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQzVCLGtCQUFVLEdBQUcsU0FBUyxDQUFDO0NBQzFCO0tBQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ25DLHNEQUFzRDtJQUN0RCxrQkFBVSxHQUFHLGlCQUFZLENBQUMsY0FBTyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNqRTtLQUFNO0lBQ0gsb0RBQW9EO0lBQ3BELGtCQUFVLEdBQUcsaUJBQVksQ0FBQyxjQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQy9EO0FBR0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQzVCLHlCQUFpQixHQUFHLGNBQU0sQ0FBQztDQUM5QjtLQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNuQyx5QkFBaUIsR0FBRyxpQkFBWSxDQUFDLGNBQU8sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUMvRTtLQUFNO0lBQ0gsYUFBYTtJQUNiLHlCQUFpQixHQUFHLGlCQUFZLENBQUMsY0FBTyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzdFO0FBRUQsTUFBTSxNQUFNLEdBQUcseUNBQXlDLENBQUM7QUFFekQsa0VBQWtFO0FBQ3JELFFBQUEsV0FBVyxHQUFnQjtJQUNwQyxxQkFBcUI7SUFDckIsU0FBUztJQUNULFNBQVMsRUFBRSxJQUFJO0lBQ2Ysa0RBQWtEO0lBQ2xELE1BQU07Q0FDVCxDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQWtCO0lBQ3hDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN2QixNQUFNO0NBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB0eXBlIHsgU2lnbk9wdGlvbnMsIFZlcmlmeU9wdGlvbnMgfSBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY29uc3Qgc2VjcmV0ID0gJ3AnO1xuXG4vLyBITUFDID0gS2V5ZWQtSGFzaCBNQUMgKD0gTWVzc2FnZSBBdXRoZW50aWNhdGlvbiBDb2RlKVxuLy8gSFMyNTYgPSBITUFDIG1pdCBTSEEtMjU2XG4vLyBQYXNzd29ydCAoYnp3LiBTZWNyZXQpIGVyZm9yZGVybGljaFxuLy8gQmVpIFNIQS0zIGlzdCBITUFDIG5pY2h0IG1laHIgbm90d2VuZGlnLlxuLy8gU0hBLTMgaXN0IGJlaSBiZWkgZGVuIEFsZ29yaXRobWVuIGZ1ZXIgSldUICpOSUNIVCogYXVmZ2VsaXN0ZXQ6XG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzUxOFxuLy8gY29uc3QgYWxnb3JpdGhtID0gJ0hTMjU2JztcblxuLy8gUlNBIHZvbiBSb24gUml2ZXN0LCBBZGkgU2hhbWlyLCBMZW9uYXJkIEFkbGVtYW5cbi8vIFJTQSBpbXBsaXppZXJ0IGVpbmVuIHByaXZhdGVuIHVuZCBlaW5lbiBvZWZmZW50bGljaGVuIFNjaGx1ZXNzZWxcbi8vIFJTMjU2ID0gUlNBIG1pdCBTSEEtMjU2ICh2ZXJ3ZW5kZXQgdS5hLiB2b24gR29vZ2xlKVxuY29uc3QgYWxnb3JpdGhtID0gJ1JTMjU2JztcblxuLy8gRUNEU0EgPSBFbGxpcHRpYyBDdXJ2ZSBEaWdpdGFsIFNpZ25hdHVyZSBBbGdvcml0aG1cbi8vIGVsbGlwdGlzY2hlIEt1cnZlbiwgei5CLiB5XjIgPSB4XjMgKyBheCArIGJcbi8vIEVDRFNBIGhhdCBiZWkgZ2xlaWNoZXIgU2ljaGVyaGVpdCBkZXV0bGljaCBrdWVyemVyZSBTY2hsdWVzc2VsLCBiZW5vZXRpZ3Rcbi8vIGFiZXIgbWVociBSZWNoZW5sZWlzdHVuZy4gRGllIFNjaGx1ZXNzZWwgd2VyZGVuICpuaWNodCogdWViZXJ0cmFnZW4hXG4vLyBodHRwOi8vand0LmlvIGthbm4gbnVyIEhTMjU2IHVuZCBSUzI1NlxuLy8gY29uc3QgYWxnb3JpdGhtID0gJ0VTMzg0JztcblxuLy8gUlNBU1NBLVBTU1xuLy8gY29uc3QgYWxnb3JpdGhtID0gJ1BTMjU2JztcblxuZXhwb3J0IGNvbnN0IGlzSE1BQyA9ICgpID0+IGFsZ29yaXRobS5zdGFydHNXaXRoKCdIUycpO1xuXG4vKiBnbG9iYWwgX19kaXJuYW1lICovXG5jb25zdCBqd3REaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ2p3dCcpO1xuY29uc3QgdXRmOCA9ICd1dGY4JztcblxuZXhwb3J0IGxldCBwcml2YXRlS2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5pZiAoYWxnb3JpdGhtLnN0YXJ0c1dpdGgoJ0hTJykpIHtcbiAgICBwcml2YXRlS2V5ID0gdW5kZWZpbmVkO1xufSBlbHNlIGlmIChhbGdvcml0aG0uc3RhcnRzV2l0aCgnRVMnKSkge1xuICAgIC8vIFBFTS1EYXRlaSBmdWVyIGVsbGlwdGlzY2hlIEt1cnZlIGR1cmNoIHouQi4gT3BlblNTTFxuICAgIHByaXZhdGVLZXkgPSByZWFkRmlsZVN5bmMocmVzb2x2ZShqd3REaXIsICdlY2RzYS5wZW0nKSwgdXRmOCk7XG59IGVsc2Uge1xuICAgIC8vIGRlZmF1bHQgKHouQi4gUlMyNTYpIFBFTS1EYXRlaSBkdXJjaCB6LkIuIE9wZW5TU0xcbiAgICBwcml2YXRlS2V5ID0gcmVhZEZpbGVTeW5jKHJlc29sdmUoand0RGlyLCAncnNhLnBlbScpLCB1dGY4KTtcbn1cblxuZXhwb3J0IGxldCBzZWNyZXRPclB1YmxpY0tleTogc3RyaW5nO1xuaWYgKGFsZ29yaXRobS5zdGFydHNXaXRoKCdIUycpKSB7XG4gICAgc2VjcmV0T3JQdWJsaWNLZXkgPSBzZWNyZXQ7XG59IGVsc2UgaWYgKGFsZ29yaXRobS5zdGFydHNXaXRoKCdFUycpKSB7XG4gICAgc2VjcmV0T3JQdWJsaWNLZXkgPSByZWFkRmlsZVN5bmMocmVzb2x2ZShqd3REaXIsICdlY2RzYS5wdWJsaWMucGVtJyksIHV0ZjgpO1xufSBlbHNlIHtcbiAgICAvLyB6LkIuIFJTMjU2XG4gICAgc2VjcmV0T3JQdWJsaWNLZXkgPSByZWFkRmlsZVN5bmMocmVzb2x2ZShqd3REaXIsICdyc2EucHVibGljLnBlbScpLCB1dGY4KTtcbn1cblxuY29uc3QgaXNzdWVyID0gJ2h0dHBzOi8vYWNtZS5jb20vc2hvcC9KdWVyZ2VuWmltbWVybWFubic7XG5cbi8vIHN1YihqZWN0KSB1bmQganRpICg9IEpXVCBJZCkgbXVlc3NlbiBpbmRpdmlkdWVsbCBnZXNldHp0IHdlcmRlblxuZXhwb3J0IGNvbnN0IHNpZ25PcHRpb25zOiBTaWduT3B0aW9ucyA9IHtcbiAgICAvLyBzaG9ydGhhbmQgcHJvcGVydHlcbiAgICBhbGdvcml0aG0sXG4gICAgZXhwaXJlc0luOiAnMWQnLFxuICAgIC8vIGdnZi4gYWxzIEROICg9IGRpc3Rpbmd1aXNoZWQgbmFtZSkgZ2VtYWVzcyBMREFQXG4gICAgaXNzdWVyLFxufTtcblxuZXhwb3J0IGNvbnN0IHZlcmlmeU9wdGlvbnM6IFZlcmlmeU9wdGlvbnMgPSB7XG4gICAgYWxnb3JpdGhtczogW2FsZ29yaXRobV0sXG4gICAgaXNzdWVyLFxufTtcbiJdfQ==
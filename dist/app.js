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
exports.app = exports.PATHS = void 0;
const tslib_1 = require("tslib");
const shared_1 = require("./shared");
const rest_1 = require("./buch/rest");
const html_1 = require("./buch/html");
const auth_1 = require("./auth");
// Einlesen von application/json im Request-Rumpf
// Fuer multimediale Daten (Videos, Bilder, Audios): raw-body
const body_parser_1 = require("body-parser");
const graphql_1 = require("./buch/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const express_bearer_token_1 = tslib_1.__importDefault(require("express-bearer-token"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const express_1 = tslib_1.__importDefault(require("express"));
const security_1 = require("./security");
const path_1 = require("path");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
const response_time_1 = tslib_1.__importDefault(require("response-time"));
const { Router } = express_1.default; // eslint-disable-line @typescript-eslint/naming-convention
const rateLimitOptions = {
    // z.B. 15 Minuten als Zeitfenster (Ms = Millisekunden)
    windowMs: shared_1.WINDOW_SIZE,
    // z.B. max 100 requests/IP in einem Zeitfenster
    max: shared_1.MAX_REQUESTS_PER_WINDOW,
};
const limiter = express_rate_limit_1.default(rateLimitOptions);
// hochgeladene Dateien als Buffer im Hauptspeicher halten
// const storage = multer.memoryStorage()
// const uploader = multer({storage})
const apiPath = '/api';
exports.PATHS = {
    buecher: `${apiPath}/buecher`,
    verlage: `${apiPath}/verlage`,
    login: `${apiPath}/login`,
    graphql: '/graphql',
    html: '/html',
};
// Express als Middleware = anwendungsneutrale Dienste-/Zwischenschicht,
// d.h. Vermittler zwischen Request und Response.
// Alternativen zu Express (hat die hoechsten Download-Zahlen):
// * Hapi: von Walmart
// * Restify
// * Koa: von den urspruengl. Express-Entwicklern
// * Sails: baut auf Express auf, Waterline als ORM
// * Kraken: baut auf Express auf
//           von PayPal
//           verwaltet von der Node.js Foundation
//           genutzt von Oracle mit Oracle JET
class App {
    constructor() {
        // Das App- bzw. Express-Objekt ist zustaendig fuer:
        //  * Konfiguration der Middleware
        //  * Routing
        // http://expressjs.com/en/api.html
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        if (shared_1.serverConfig.dev) {
            // Logging der eingehenden Requests in der Console
            this.app.use(morgan_1.default('dev'), 
            // Protokollierung der Response Time
            response_time_1.default(shared_1.responseTimeFn), 
            // Protokollierung des eingehenden Request-Headers
            shared_1.logRequestHeader);
        }
        this.app.use(express_bearer_token_1.default(), 
        // Spread Operator ab ES 2015
        ...security_1.helmetHandlers, 
        // falls CORS fuer die Webanwendung notwendig ist:
        // corsHandler,
        // GZIP-Komprimierung implizit unterstuetzt durch Chrome, FF, ...
        //   Accept-Encoding: gzip
        // Alternative: z.B. nginx als Proxy-Server und dort komprimieren
        compression_1.default(), limiter);
    }
    routes() {
        this.buecherRoutes();
        this.verlagRoutes();
        this.loginRoutes();
        this.buchGraphqlRoutes();
        this.htmlRoutes();
        this.app.get('*', shared_1.notFound);
        this.app.use(shared_1.internalError);
    }
    buecherRoutes() {
        // vgl: Spring WebFlux.fn
        // https://expressjs.com/en/api.html#router
        // Beispiele fuer "Middleware" bei Express:
        //  * Authentifizierung und Autorisierung
        //  * Rumpf bei POST- und PUT-Requests einlesen
        //  * Logging, z.B. von Requests
        //  * Aufruf der naechsten Middleware-Funktion
        // d.h. "Middleware" ist eine Variation der Patterns
        //  * Filter (Interceptoren) und
        //  * Chain of Responsibility
        // Ausblick zu Express 5 (z.Zt. noch als Alpha-Release):
        //  * Router als eigenes Modul https://github.com/pillarjs/router
        //  * Zusaetzliche Syntax beim Routing
        //  * Promises statt Callbacks
        //  * Verbesserte Handhabung von Query Strings
        //  * noch keine .d.ts-Datei
        const router = Router(); // eslint-disable-line new-cap
        router
            .route('/')
            // https://expressjs.com/en/api.html#app.get.method
            .get(rest_1.find)
            .post(auth_1.validateJwt, shared_1.validateContentType, auth_1.isAdminMitarbeiter, body_parser_1.json(), rest_1.create);
        const idParam = 'id';
        router
            .param(idParam, shared_1.validateUUID)
            .get(`/:${idParam}`, rest_1.findById)
            .put(`/:${idParam}`, auth_1.validateJwt, shared_1.validateContentType, auth_1.isAdminMitarbeiter, body_parser_1.json(), rest_1.update)
            .delete(`/:${idParam}`, auth_1.validateJwt, auth_1.isAdmin, rest_1.deleteFn)
            .put(`/:${idParam}/file`, auth_1.validateJwt, auth_1.isAdminMitarbeiter, rest_1.upload)
            .get(`/:${idParam}/file`, rest_1.download);
        this.app.use(exports.PATHS.buecher, router);
    }
    verlagRoutes() {
        const router = Router(); // eslint-disable-line new-cap
        router.get('/', shared_1.notYetImplemented);
        this.app.use(exports.PATHS.verlage, router);
    }
    loginRoutes() {
        const router = Router(); // eslint-disable-line new-cap
        router.route('/').post(body_parser_1.urlencoded({
            extended: false,
            type: 'application/x-www-form-urlencoded',
        }), auth_1.login);
        this.app.use(exports.PATHS.login, router);
    }
    buchGraphqlRoutes() {
        const { playground } = shared_1.serverConfig;
        // https://www.apollographql.com/docs/apollo-server/data/resolvers/#passing-resolvers-to-apollo-server
        const config = {
            typeDefs: graphql_1.typeDefs,
            resolvers: graphql_1.resolvers,
            playground,
            introspection: playground,
        };
        const apollo = new apollo_server_express_1.ApolloServer(config);
        // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#applying-middleware
        apollo.applyMiddleware({ app: this.app, path: exports.PATHS.graphql });
    }
    htmlRoutes() {
        const router = Router(); // eslint-disable-line new-cap
        router.route('/').get(html_1.index);
        router.route('/suche').get(html_1.suche);
        router.route('/neues-buch').get(html_1.neuesBuch);
        this.app.use(exports.PATHS.html, router);
        // Alternativen zu Pug: EJS, Handlebars, ...
        // https://github.com/expressjs/express/wiki#template-engines
        this.app.set('view engine', 'ejs');
        // __dirname ist das Verzeichnis ".../dist/server"
        /* global __dirname */
        this.app.set('views', path_1.join(__dirname, 'views'));
        this.app.use(express_1.default.static(path_1.join(__dirname, 'public')));
    }
}
exports.app = new App().app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgscUNBV2tCO0FBQ2xCLHNDQVFxQjtBQUNyQixzQ0FBc0Q7QUFDdEQsaUNBQXlFO0FBQ3pFLGlEQUFpRDtBQUNqRCw2REFBNkQ7QUFDN0QsNkNBQStDO0FBQy9DLDRDQUFxRDtBQUNyRCxpRUFBcUQ7QUFHckQsd0ZBQStDO0FBQy9DLHNFQUFzQztBQUN0Qyw4REFBOEI7QUFDOUIseUNBQTRDO0FBQzVDLCtCQUE0QjtBQUM1Qiw0REFBNEI7QUFDNUIsb0ZBQTJDO0FBQzNDLDBFQUF5QztBQUV6QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsaUJBQU8sQ0FBQyxDQUFDLDJEQUEyRDtBQUV2RixNQUFNLGdCQUFnQixHQUFZO0lBQzlCLHVEQUF1RDtJQUN2RCxRQUFRLEVBQUUsb0JBQVc7SUFDckIsZ0RBQWdEO0lBQ2hELEdBQUcsRUFBRSxnQ0FBdUI7Q0FDL0IsQ0FBQztBQUNGLE1BQU0sT0FBTyxHQUFHLDRCQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU1QywwREFBMEQ7QUFDMUQseUNBQXlDO0FBQ3pDLHFDQUFxQztBQUVyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDVixRQUFBLEtBQUssR0FBRztJQUNqQixPQUFPLEVBQUUsR0FBRyxPQUFPLFVBQVU7SUFDN0IsT0FBTyxFQUFFLEdBQUcsT0FBTyxVQUFVO0lBQzdCLEtBQUssRUFBRSxHQUFHLE9BQU8sUUFBUTtJQUN6QixPQUFPLEVBQUUsVUFBVTtJQUNuQixJQUFJLEVBQUUsT0FBTztDQUNoQixDQUFDO0FBRUYsd0VBQXdFO0FBQ3hFLGlEQUFpRDtBQUNqRCwrREFBK0Q7QUFDL0Qsc0JBQXNCO0FBQ3RCLFlBQVk7QUFDWixpREFBaUQ7QUFDakQsbURBQW1EO0FBQ25ELGlDQUFpQztBQUNqQyx1QkFBdUI7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QUFDLFlBQUssQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQUssQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLDRDQUE0QztRQUM1Qyw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLGtEQUFrRDtRQUNsRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0o7QUFDYyxXQUFHLEdBQUssSUFBSSxHQUFHLEVBQUUsS0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7XG4gICAgTUFYX1JFUVVFU1RTX1BFUl9XSU5ET1csXG4gICAgV0lORE9XX1NJWkUsXG4gICAgaW50ZXJuYWxFcnJvcixcbiAgICBsb2dSZXF1ZXN0SGVhZGVyLFxuICAgIG5vdEZvdW5kLFxuICAgIG5vdFlldEltcGxlbWVudGVkLFxuICAgIHJlc3BvbnNlVGltZUZuLFxuICAgIHNlcnZlckNvbmZpZyxcbiAgICB2YWxpZGF0ZUNvbnRlbnRUeXBlLFxuICAgIHZhbGlkYXRlVVVJRCxcbn0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgICBjcmVhdGUsXG4gICAgZGVsZXRlRm4sXG4gICAgZG93bmxvYWQsXG4gICAgZmluZCxcbiAgICBmaW5kQnlJZCxcbiAgICB1cGRhdGUsXG4gICAgdXBsb2FkLFxufSBmcm9tICcuL2J1Y2gvcmVzdCc7XG5pbXBvcnQgeyBpbmRleCwgbmV1ZXNCdWNoLCBzdWNoZSB9IGZyb20gJy4vYnVjaC9odG1sJztcbmltcG9ydCB7IGlzQWRtaW4sIGlzQWRtaW5NaXRhcmJlaXRlciwgbG9naW4sIHZhbGlkYXRlSnd0IH0gZnJvbSAnLi9hdXRoJztcbi8vIEVpbmxlc2VuIHZvbiBhcHBsaWNhdGlvbi9qc29uIGltIFJlcXVlc3QtUnVtcGZcbi8vIEZ1ZXIgbXVsdGltZWRpYWxlIERhdGVuIChWaWRlb3MsIEJpbGRlciwgQXVkaW9zKTogcmF3LWJvZHlcbmltcG9ydCB7IGpzb24sIHVybGVuY29kZWQgfSBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgeyByZXNvbHZlcnMsIHR5cGVEZWZzIH0gZnJvbSAnLi9idWNoL2dyYXBocWwnO1xuaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1leHByZXNzJztcbmltcG9ydCB0eXBlIHsgQXBvbGxvU2VydmVyRXhwcmVzc0NvbmZpZyB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMgfSBmcm9tICdleHByZXNzLXJhdGUtbGltaXQnO1xuaW1wb3J0IGJlYXJlclRva2VuIGZyb20gJ2V4cHJlc3MtYmVhcmVyLXRva2VuJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGhlbG1ldEhhbmRsZXJzIH0gZnJvbSAnLi9zZWN1cml0eSc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgcmF0ZUxpbWl0IGZyb20gJ2V4cHJlc3MtcmF0ZS1saW1pdCc7XG5pbXBvcnQgcmVzcG9uc2VUaW1lIGZyb20gJ3Jlc3BvbnNlLXRpbWUnO1xuXG5jb25zdCB7IFJvdXRlciB9ID0gZXhwcmVzczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cblxuY29uc3QgcmF0ZUxpbWl0T3B0aW9uczogT3B0aW9ucyA9IHtcbiAgICAvLyB6LkIuIDE1IE1pbnV0ZW4gYWxzIFplaXRmZW5zdGVyIChNcyA9IE1pbGxpc2VrdW5kZW4pXG4gICAgd2luZG93TXM6IFdJTkRPV19TSVpFLFxuICAgIC8vIHouQi4gbWF4IDEwMCByZXF1ZXN0cy9JUCBpbiBlaW5lbSBaZWl0ZmVuc3RlclxuICAgIG1heDogTUFYX1JFUVVFU1RTX1BFUl9XSU5ET1csXG59O1xuY29uc3QgbGltaXRlciA9IHJhdGVMaW1pdChyYXRlTGltaXRPcHRpb25zKTtcblxuLy8gaG9jaGdlbGFkZW5lIERhdGVpZW4gYWxzIEJ1ZmZlciBpbSBIYXVwdHNwZWljaGVyIGhhbHRlblxuLy8gY29uc3Qgc3RvcmFnZSA9IG11bHRlci5tZW1vcnlTdG9yYWdlKClcbi8vIGNvbnN0IHVwbG9hZGVyID0gbXVsdGVyKHtzdG9yYWdlfSlcblxuY29uc3QgYXBpUGF0aCA9ICcvYXBpJztcbmV4cG9ydCBjb25zdCBQQVRIUyA9IHtcbiAgICBidWVjaGVyOiBgJHthcGlQYXRofS9idWVjaGVyYCxcbiAgICB2ZXJsYWdlOiBgJHthcGlQYXRofS92ZXJsYWdlYCxcbiAgICBsb2dpbjogYCR7YXBpUGF0aH0vbG9naW5gLFxuICAgIGdyYXBocWw6ICcvZ3JhcGhxbCcsXG4gICAgaHRtbDogJy9odG1sJyxcbn07XG5cbi8vIEV4cHJlc3MgYWxzIE1pZGRsZXdhcmUgPSBhbndlbmR1bmdzbmV1dHJhbGUgRGllbnN0ZS0vWndpc2NoZW5zY2hpY2h0LFxuLy8gZC5oLiBWZXJtaXR0bGVyIHp3aXNjaGVuIFJlcXVlc3QgdW5kIFJlc3BvbnNlLlxuLy8gQWx0ZXJuYXRpdmVuIHp1IEV4cHJlc3MgKGhhdCBkaWUgaG9lY2hzdGVuIERvd25sb2FkLVphaGxlbik6XG4vLyAqIEhhcGk6IHZvbiBXYWxtYXJ0XG4vLyAqIFJlc3RpZnlcbi8vICogS29hOiB2b24gZGVuIHVyc3BydWVuZ2wuIEV4cHJlc3MtRW50d2lja2xlcm5cbi8vICogU2FpbHM6IGJhdXQgYXVmIEV4cHJlc3MgYXVmLCBXYXRlcmxpbmUgYWxzIE9STVxuLy8gKiBLcmFrZW46IGJhdXQgYXVmIEV4cHJlc3MgYXVmXG4vLyAgICAgICAgICAgdm9uIFBheVBhbFxuLy8gICAgICAgICAgIHZlcndhbHRldCB2b24gZGVyIE5vZGUuanMgRm91bmRhdGlvblxuLy8gICAgICAgICAgIGdlbnV0enQgdm9uIE9yYWNsZSBtaXQgT3JhY2xlIEpFVFxuXG5jbGFzcyBBcHAge1xuICAgIC8vIERhcyBBcHAtIGJ6dy4gRXhwcmVzcy1PYmpla3QgaXN0IHp1c3RhZW5kaWcgZnVlcjpcbiAgICAvLyAgKiBLb25maWd1cmF0aW9uIGRlciBNaWRkbGV3YXJlXG4gICAgLy8gICogUm91dGluZ1xuICAgIC8vIGh0dHA6Ly9leHByZXNzanMuY29tL2VuL2FwaS5odG1sXG4gICAgcmVhZG9ubHkgYXBwID0gZXhwcmVzcygpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29uZmlnKCk7XG4gICAgICAgIHRoaXMucm91dGVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maWcoKSB7XG4gICAgICAgIGlmIChzZXJ2ZXJDb25maWcuZGV2KSB7XG4gICAgICAgICAgICAvLyBMb2dnaW5nIGRlciBlaW5nZWhlbmRlbiBSZXF1ZXN0cyBpbiBkZXIgQ29uc29sZVxuICAgICAgICAgICAgdGhpcy5hcHAudXNlKFxuICAgICAgICAgICAgICAgIG1vcmdhbignZGV2JyksXG4gICAgICAgICAgICAgICAgLy8gUHJvdG9rb2xsaWVydW5nIGRlciBSZXNwb25zZSBUaW1lXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUaW1lKHJlc3BvbnNlVGltZUZuKSxcbiAgICAgICAgICAgICAgICAvLyBQcm90b2tvbGxpZXJ1bmcgZGVzIGVpbmdlaGVuZGVuIFJlcXVlc3QtSGVhZGVyc1xuICAgICAgICAgICAgICAgIGxvZ1JlcXVlc3RIZWFkZXIsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHAudXNlKFxuICAgICAgICAgICAgYmVhcmVyVG9rZW4oKSxcblxuICAgICAgICAgICAgLy8gU3ByZWFkIE9wZXJhdG9yIGFiIEVTIDIwMTVcbiAgICAgICAgICAgIC4uLmhlbG1ldEhhbmRsZXJzLFxuXG4gICAgICAgICAgICAvLyBmYWxscyBDT1JTIGZ1ZXIgZGllIFdlYmFud2VuZHVuZyBub3R3ZW5kaWcgaXN0OlxuICAgICAgICAgICAgLy8gY29yc0hhbmRsZXIsXG5cbiAgICAgICAgICAgIC8vIEdaSVAtS29tcHJpbWllcnVuZyBpbXBsaXppdCB1bnRlcnN0dWV0enQgZHVyY2ggQ2hyb21lLCBGRiwgLi4uXG4gICAgICAgICAgICAvLyAgIEFjY2VwdC1FbmNvZGluZzogZ3ppcFxuICAgICAgICAgICAgLy8gQWx0ZXJuYXRpdmU6IHouQi4gbmdpbnggYWxzIFByb3h5LVNlcnZlciB1bmQgZG9ydCBrb21wcmltaWVyZW5cbiAgICAgICAgICAgIGNvbXByZXNzaW9uKCksXG4gICAgICAgICAgICBsaW1pdGVyLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcm91dGVzKCkge1xuICAgICAgICB0aGlzLmJ1ZWNoZXJSb3V0ZXMoKTtcbiAgICAgICAgdGhpcy52ZXJsYWdSb3V0ZXMoKTtcbiAgICAgICAgdGhpcy5sb2dpblJvdXRlcygpO1xuICAgICAgICB0aGlzLmJ1Y2hHcmFwaHFsUm91dGVzKCk7XG4gICAgICAgIHRoaXMuaHRtbFJvdXRlcygpO1xuXG4gICAgICAgIHRoaXMuYXBwLmdldCgnKicsIG5vdEZvdW5kKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGludGVybmFsRXJyb3IpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVlY2hlclJvdXRlcygpIHtcbiAgICAgICAgLy8gdmdsOiBTcHJpbmcgV2ViRmx1eC5mblxuICAgICAgICAvLyBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vYXBpLmh0bWwjcm91dGVyXG4gICAgICAgIC8vIEJlaXNwaWVsZSBmdWVyIFwiTWlkZGxld2FyZVwiIGJlaSBFeHByZXNzOlxuICAgICAgICAvLyAgKiBBdXRoZW50aWZpemllcnVuZyB1bmQgQXV0b3Jpc2llcnVuZ1xuICAgICAgICAvLyAgKiBSdW1wZiBiZWkgUE9TVC0gdW5kIFBVVC1SZXF1ZXN0cyBlaW5sZXNlblxuICAgICAgICAvLyAgKiBMb2dnaW5nLCB6LkIuIHZvbiBSZXF1ZXN0c1xuICAgICAgICAvLyAgKiBBdWZydWYgZGVyIG5hZWNoc3RlbiBNaWRkbGV3YXJlLUZ1bmt0aW9uXG4gICAgICAgIC8vIGQuaC4gXCJNaWRkbGV3YXJlXCIgaXN0IGVpbmUgVmFyaWF0aW9uIGRlciBQYXR0ZXJuc1xuICAgICAgICAvLyAgKiBGaWx0ZXIgKEludGVyY2VwdG9yZW4pIHVuZFxuICAgICAgICAvLyAgKiBDaGFpbiBvZiBSZXNwb25zaWJpbGl0eVxuICAgICAgICAvLyBBdXNibGljayB6dSBFeHByZXNzIDUgKHouWnQuIG5vY2ggYWxzIEFscGhhLVJlbGVhc2UpOlxuICAgICAgICAvLyAgKiBSb3V0ZXIgYWxzIGVpZ2VuZXMgTW9kdWwgaHR0cHM6Ly9naXRodWIuY29tL3BpbGxhcmpzL3JvdXRlclxuICAgICAgICAvLyAgKiBadXNhZXR6bGljaGUgU3ludGF4IGJlaW0gUm91dGluZ1xuICAgICAgICAvLyAgKiBQcm9taXNlcyBzdGF0dCBDYWxsYmFja3NcbiAgICAgICAgLy8gICogVmVyYmVzc2VydGUgSGFuZGhhYnVuZyB2b24gUXVlcnkgU3RyaW5nc1xuICAgICAgICAvLyAgKiBub2NoIGtlaW5lIC5kLnRzLURhdGVpXG4gICAgICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgICAgICAgcm91dGVyXG4gICAgICAgICAgICAucm91dGUoJy8nKVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9leHByZXNzanMuY29tL2VuL2FwaS5odG1sI2FwcC5nZXQubWV0aG9kXG4gICAgICAgICAgICAuZ2V0KGZpbmQpXG4gICAgICAgICAgICAucG9zdChcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUp3dCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUNvbnRlbnRUeXBlLFxuICAgICAgICAgICAgICAgIGlzQWRtaW5NaXRhcmJlaXRlcixcbiAgICAgICAgICAgICAgICBqc29uKCksXG4gICAgICAgICAgICAgICAgY3JlYXRlLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBpZFBhcmFtID0gJ2lkJztcbiAgICAgICAgcm91dGVyXG4gICAgICAgICAgICAucGFyYW0oaWRQYXJhbSwgdmFsaWRhdGVVVUlEKVxuICAgICAgICAgICAgLmdldChgLzoke2lkUGFyYW19YCwgZmluZEJ5SWQpXG4gICAgICAgICAgICAucHV0KFxuICAgICAgICAgICAgICAgIGAvOiR7aWRQYXJhbX1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlSnd0LFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlQ29udGVudFR5cGUsXG4gICAgICAgICAgICAgICAgaXNBZG1pbk1pdGFyYmVpdGVyLFxuICAgICAgICAgICAgICAgIGpzb24oKSxcbiAgICAgICAgICAgICAgICB1cGRhdGUsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZGVsZXRlKGAvOiR7aWRQYXJhbX1gLCB2YWxpZGF0ZUp3dCwgaXNBZG1pbiwgZGVsZXRlRm4pXG4gICAgICAgICAgICAucHV0KGAvOiR7aWRQYXJhbX0vZmlsZWAsIHZhbGlkYXRlSnd0LCBpc0FkbWluTWl0YXJiZWl0ZXIsIHVwbG9hZClcbiAgICAgICAgICAgIC5nZXQoYC86JHtpZFBhcmFtfS9maWxlYCwgZG93bmxvYWQpO1xuXG4gICAgICAgIHRoaXMuYXBwLnVzZShQQVRIUy5idWVjaGVyLCByb3V0ZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVybGFnUm91dGVzKCkge1xuICAgICAgICBjb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuZXctY2FwXG4gICAgICAgIHJvdXRlci5nZXQoJy8nLCBub3RZZXRJbXBsZW1lbnRlZCk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShQQVRIUy52ZXJsYWdlLCByb3V0ZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9naW5Sb3V0ZXMoKSB7XG4gICAgICAgIGNvbnN0IHJvdXRlciA9IFJvdXRlcigpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgICAgICAgcm91dGVyLnJvdXRlKCcvJykucG9zdChcbiAgICAgICAgICAgIHVybGVuY29kZWQoe1xuICAgICAgICAgICAgICAgIGV4dGVuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbG9naW4sXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShQQVRIUy5sb2dpbiwgcm91dGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1Y2hHcmFwaHFsUm91dGVzKCkge1xuICAgICAgICBjb25zdCB7IHBsYXlncm91bmQgfSA9IHNlcnZlckNvbmZpZztcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vZG9jcy9hcG9sbG8tc2VydmVyL2RhdGEvcmVzb2x2ZXJzLyNwYXNzaW5nLXJlc29sdmVycy10by1hcG9sbG8tc2VydmVyXG4gICAgICAgIGNvbnN0IGNvbmZpZzogQXBvbGxvU2VydmVyRXhwcmVzc0NvbmZpZyA9IHtcbiAgICAgICAgICAgIHR5cGVEZWZzLFxuICAgICAgICAgICAgcmVzb2x2ZXJzLFxuICAgICAgICAgICAgcGxheWdyb3VuZCxcbiAgICAgICAgICAgIGludHJvc3BlY3Rpb246IHBsYXlncm91bmQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFwb2xsbyA9IG5ldyBBcG9sbG9TZXJ2ZXIoY29uZmlnKTtcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cuYXBvbGxvZ3JhcGhxbC5jb20vZG9jcy9hcG9sbG8tc2VydmVyL2ludGVncmF0aW9ucy9taWRkbGV3YXJlLyNhcHBseWluZy1taWRkbGV3YXJlXG4gICAgICAgIGFwb2xsby5hcHBseU1pZGRsZXdhcmUoeyBhcHA6IHRoaXMuYXBwLCBwYXRoOiBQQVRIUy5ncmFwaHFsIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaHRtbFJvdXRlcygpIHtcbiAgICAgICAgY29uc3Qgcm91dGVyID0gUm91dGVyKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuICAgICAgICByb3V0ZXIucm91dGUoJy8nKS5nZXQoaW5kZXgpO1xuICAgICAgICByb3V0ZXIucm91dGUoJy9zdWNoZScpLmdldChzdWNoZSk7XG4gICAgICAgIHJvdXRlci5yb3V0ZSgnL25ldWVzLWJ1Y2gnKS5nZXQobmV1ZXNCdWNoKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKFBBVEhTLmh0bWwsIHJvdXRlcik7XG5cbiAgICAgICAgLy8gQWx0ZXJuYXRpdmVuIHp1IFB1ZzogRUpTLCBIYW5kbGViYXJzLCAuLi5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2V4cHJlc3Nqcy9leHByZXNzL3dpa2kjdGVtcGxhdGUtZW5naW5lc1xuICAgICAgICB0aGlzLmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2VqcycpO1xuICAgICAgICAvLyBfX2Rpcm5hbWUgaXN0IGRhcyBWZXJ6ZWljaG5pcyBcIi4uLi9kaXN0L3NlcnZlclwiXG4gICAgICAgIC8qIGdsb2JhbCBfX2Rpcm5hbWUgKi9cbiAgICAgICAgdGhpcy5hcHAuc2V0KCd2aWV3cycsIGpvaW4oX19kaXJuYW1lLCAndmlld3MnKSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShleHByZXNzLnN0YXRpYyhqb2luKF9fZGlybmFtZSwgJ3B1YmxpYycpKSk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IHsgYXBwIH0gPSBuZXcgQXBwKCk7XG4iXX0=
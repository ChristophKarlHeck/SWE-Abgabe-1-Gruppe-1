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
exports.typeDefs = void 0;
/**
 * Typdefinitionen fuer GraphQL:
 *  Vordefinierte skalare Typen
 *      Int: 32‐bit Integer
 *      Float: Gleitkommmazahl mit doppelter Genauigkeit
 *      String:
 *      Boolean: true, false
 *      ID: eindeutiger Bezeichner, wird serialisiert wie ein String
 *  Buch: eigene Typdefinition für Queries
 *        "!" markiert Pflichtfelder
 *  Query: Signatur der Lese-Methoden
 *  Mutation: Signatur der Schreib-Methoden
 */
const apollo_server_express_1 = require("apollo-server-express");
// https://www.apollographql.com/docs/apollo-server/migration-two-dot/#the-gql-tag
// https://www.apollographql.com/docs/apollo-server/schema/schema
// "Tagged Template String", d.h. der Template-String wird durch eine Funktion
// (hier: gql) modifiziert. Die Funktion gql wird fuer Syntax-Highlighting und
// fuer die Formatierung durch Prettier verwendet.
exports.typeDefs = apollo_server_express_1.gql `
    "Enum-Typ fuer die Art eines Buches"
    enum Art {
        DRUCKAUSGABE
        KINDLE
    }

    "Enum-Typ fuer den Verlag eines Buches"
    enum Verlag {
        FOO_VERLAG
        BAR_VERLAG
    }

    "Datenschema eines Buches, das empfangen oder gesendet wird"
    type Buch {
        id: ID!
        version: Int
        titel: String!
        rating: Int
        art: Art
        verlag: Verlag!
        preis: Float
        rabatt: Float
        lieferbar: Boolean
        datum: String
        isbn: String
        homepage: String
        schlagwoerter: [String]
    }

    "Funktionen, um Buecher zu empfangen"
    type Query {
        buecher(titel: String): [Buch]
        buch(id: ID!): Buch
    }

    "Funktionen, um Buecher anzulegen, zu aktualisieren oder zu loeschen"
    type Mutation {
        createBuch(
            titel: String!
            rating: Int
            art: String
            verlag: String!
            preis: Float
            rabatt: Float
            lieferbar: Boolean
            datum: String
            isbn: String
            homepage: String
            schlagwoerter: [String]
        ): Buch
        updateBuch(
            _id: ID
            titel: String!
            rating: Int
            art: String
            verlag: String!
            preis: Float
            rabatt: Float
            lieferbar: Boolean
            datum: String
            isbn: String
            homepage: String
            schlagwoerter: [String]
            version: Int
        ): Buch
        deleteBuch(id: ID!): Boolean
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVjaC9ncmFwaHFsL3R5cGVEZWZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUVIOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILGlFQUE0QztBQUU1QyxrRkFBa0Y7QUFDbEYsaUVBQWlFO0FBRWpFLDhFQUE4RTtBQUM5RSw4RUFBOEU7QUFDOUUsa0RBQWtEO0FBQ3JDLFFBQUEsUUFBUSxHQUFHLDJCQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0UxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOCAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyoqXG4gKiBUeXBkZWZpbml0aW9uZW4gZnVlciBHcmFwaFFMOlxuICogIFZvcmRlZmluaWVydGUgc2thbGFyZSBUeXBlblxuICogICAgICBJbnQ6IDMy4oCQYml0IEludGVnZXJcbiAqICAgICAgRmxvYXQ6IEdsZWl0a29tbW1hemFobCBtaXQgZG9wcGVsdGVyIEdlbmF1aWdrZWl0XG4gKiAgICAgIFN0cmluZzpcbiAqICAgICAgQm9vbGVhbjogdHJ1ZSwgZmFsc2VcbiAqICAgICAgSUQ6IGVpbmRldXRpZ2VyIEJlemVpY2huZXIsIHdpcmQgc2VyaWFsaXNpZXJ0IHdpZSBlaW4gU3RyaW5nXG4gKiAgQnVjaDogZWlnZW5lIFR5cGRlZmluaXRpb24gZsO8ciBRdWVyaWVzXG4gKiAgICAgICAgXCIhXCIgbWFya2llcnQgUGZsaWNodGZlbGRlclxuICogIFF1ZXJ5OiBTaWduYXR1ciBkZXIgTGVzZS1NZXRob2RlblxuICogIE11dGF0aW9uOiBTaWduYXR1ciBkZXIgU2NocmVpYi1NZXRob2RlblxuICovXG5cbmltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5cbi8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvYXBvbGxvLXNlcnZlci9taWdyYXRpb24tdHdvLWRvdC8jdGhlLWdxbC10YWdcbi8vIGh0dHBzOi8vd3d3LmFwb2xsb2dyYXBocWwuY29tL2RvY3MvYXBvbGxvLXNlcnZlci9zY2hlbWEvc2NoZW1hXG5cbi8vIFwiVGFnZ2VkIFRlbXBsYXRlIFN0cmluZ1wiLCBkLmguIGRlciBUZW1wbGF0ZS1TdHJpbmcgd2lyZCBkdXJjaCBlaW5lIEZ1bmt0aW9uXG4vLyAoaGllcjogZ3FsKSBtb2RpZml6aWVydC4gRGllIEZ1bmt0aW9uIGdxbCB3aXJkIGZ1ZXIgU3ludGF4LUhpZ2hsaWdodGluZyB1bmRcbi8vIGZ1ZXIgZGllIEZvcm1hdGllcnVuZyBkdXJjaCBQcmV0dGllciB2ZXJ3ZW5kZXQuXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXG4gICAgXCJFbnVtLVR5cCBmdWVyIGRpZSBBcnQgZWluZXMgQnVjaGVzXCJcbiAgICBlbnVtIEFydCB7XG4gICAgICAgIERSVUNLQVVTR0FCRVxuICAgICAgICBLSU5ETEVcbiAgICB9XG5cbiAgICBcIkVudW0tVHlwIGZ1ZXIgZGVuIFZlcmxhZyBlaW5lcyBCdWNoZXNcIlxuICAgIGVudW0gVmVybGFnIHtcbiAgICAgICAgRk9PX1ZFUkxBR1xuICAgICAgICBCQVJfVkVSTEFHXG4gICAgfVxuXG4gICAgXCJEYXRlbnNjaGVtYSBlaW5lcyBCdWNoZXMsIGRhcyBlbXBmYW5nZW4gb2RlciBnZXNlbmRldCB3aXJkXCJcbiAgICB0eXBlIEJ1Y2gge1xuICAgICAgICBpZDogSUQhXG4gICAgICAgIHZlcnNpb246IEludFxuICAgICAgICB0aXRlbDogU3RyaW5nIVxuICAgICAgICByYXRpbmc6IEludFxuICAgICAgICBhcnQ6IEFydFxuICAgICAgICB2ZXJsYWc6IFZlcmxhZyFcbiAgICAgICAgcHJlaXM6IEZsb2F0XG4gICAgICAgIHJhYmF0dDogRmxvYXRcbiAgICAgICAgbGllZmVyYmFyOiBCb29sZWFuXG4gICAgICAgIGRhdHVtOiBTdHJpbmdcbiAgICAgICAgaXNibjogU3RyaW5nXG4gICAgICAgIGhvbWVwYWdlOiBTdHJpbmdcbiAgICAgICAgc2NobGFnd29lcnRlcjogW1N0cmluZ11cbiAgICB9XG5cbiAgICBcIkZ1bmt0aW9uZW4sIHVtIEJ1ZWNoZXIgenUgZW1wZmFuZ2VuXCJcbiAgICB0eXBlIFF1ZXJ5IHtcbiAgICAgICAgYnVlY2hlcih0aXRlbDogU3RyaW5nKTogW0J1Y2hdXG4gICAgICAgIGJ1Y2goaWQ6IElEISk6IEJ1Y2hcbiAgICB9XG5cbiAgICBcIkZ1bmt0aW9uZW4sIHVtIEJ1ZWNoZXIgYW56dWxlZ2VuLCB6dSBha3R1YWxpc2llcmVuIG9kZXIgenUgbG9lc2NoZW5cIlxuICAgIHR5cGUgTXV0YXRpb24ge1xuICAgICAgICBjcmVhdGVCdWNoKFxuICAgICAgICAgICAgdGl0ZWw6IFN0cmluZyFcbiAgICAgICAgICAgIHJhdGluZzogSW50XG4gICAgICAgICAgICBhcnQ6IFN0cmluZ1xuICAgICAgICAgICAgdmVybGFnOiBTdHJpbmchXG4gICAgICAgICAgICBwcmVpczogRmxvYXRcbiAgICAgICAgICAgIHJhYmF0dDogRmxvYXRcbiAgICAgICAgICAgIGxpZWZlcmJhcjogQm9vbGVhblxuICAgICAgICAgICAgZGF0dW06IFN0cmluZ1xuICAgICAgICAgICAgaXNibjogU3RyaW5nXG4gICAgICAgICAgICBob21lcGFnZTogU3RyaW5nXG4gICAgICAgICAgICBzY2hsYWd3b2VydGVyOiBbU3RyaW5nXVxuICAgICAgICApOiBCdWNoXG4gICAgICAgIHVwZGF0ZUJ1Y2goXG4gICAgICAgICAgICBfaWQ6IElEXG4gICAgICAgICAgICB0aXRlbDogU3RyaW5nIVxuICAgICAgICAgICAgcmF0aW5nOiBJbnRcbiAgICAgICAgICAgIGFydDogU3RyaW5nXG4gICAgICAgICAgICB2ZXJsYWc6IFN0cmluZyFcbiAgICAgICAgICAgIHByZWlzOiBGbG9hdFxuICAgICAgICAgICAgcmFiYXR0OiBGbG9hdFxuICAgICAgICAgICAgbGllZmVyYmFyOiBCb29sZWFuXG4gICAgICAgICAgICBkYXR1bTogU3RyaW5nXG4gICAgICAgICAgICBpc2JuOiBTdHJpbmdcbiAgICAgICAgICAgIGhvbWVwYWdlOiBTdHJpbmdcbiAgICAgICAgICAgIHNjaGxhZ3dvZXJ0ZXI6IFtTdHJpbmddXG4gICAgICAgICAgICB2ZXJzaW9uOiBJbnRcbiAgICAgICAgKTogQnVjaFxuICAgICAgICBkZWxldGVCdWNoKGlkOiBJRCEpOiBCb29sZWFuXG4gICAgfVxuYDtcbiJdfQ==
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

/**
 * Typdefinitionen fuer GraphQL:
 *  Vordefinierte skalare Typen
 *      Int: 32‐bit Integer
 *      Float: Gleitkommmazahl mit doppelter Genauigkeit
 *      String:
 *      Boolean: true, false
 *      ID: eindeutiger Bezeichner, wird serialisiert wie ein String
 *  Film: eigene Typdefinition für Queries
 *        "!" markiert Pflichtfelder
 *  Query: Signatur der Lese-Methoden
 *  Mutation: Signatur der Schreib-Methoden
 */

import { gql } from 'apollo-server-express';

// https://www.apollographql.com/docs/apollo-server/migration-two-dot/#the-gql-tag
// https://www.apollographql.com/docs/apollo-server/schema/schema

// "Tagged Template String", d.h. der Template-String wird durch eine Funktion
// (hier: gql) modifiziert. Die Funktion gql wird fuer Syntax-Highlighting und
// fuer die Formatierung durch Prettier verwendet.
export const typeDefs = gql`
    "Enum-Typ fuer das Genre eines Filmes"
    enum Genre {
        ACTION
        SCIENCE_FICTION
    }

    "Enum-Typ fuer das Studio eines Filmes"
    enum Studio {
        UNIVERSAL
        DISNEY
    }

    "Datenschema eines Filmes, das empfangen oder gesendet wird"
    type Film {
        id: ID!
        version: Int
        titel: String!
        bewertung: Int
        genre: Genre
        studio: Studio!
        preis: Float
        rabatt: Float
        lieferbar: Boolean
        datum: String
        FilmNr: String
        homepage: String
        schlagwoerter: [String]
    }

    "Funktionen, um Filme zu empfangen"
    type Query {
        filme(titel: String): [Film]
        film(id: ID!): Film
    }

    "Funktionen, um Filme anzulegen, zu aktualisieren oder zu loeschen"
    type Mutation {
        createFilm(
            titel: String!
            bewertung: Int
            genre: String
            studio: String!
            preis: Float
            rabatt: Float
            lieferbar: Boolean
            datum: String
            filmNr: String
            homepage: String
            schlagwoerter: [String]
        ): String
        updateFilm(
            _id: ID
            titel: String!
            bewertung: Int
            genre: String
            studio: String!
            preis: Float
            rabatt: Float
            lieferbar: Boolean
            datum: String
            filmNr: String
            homepage: String
            schlagwoerter: [String]
            version: Int
        ): Film
        deleteFilm(id: ID!): Boolean
    }
`;

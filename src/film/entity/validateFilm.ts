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

import { MAX_RATING, logger } from '../../shared';
import type { Film } from './film';
import JSON5 from 'json5';
import validator from 'validator';

const { isISBN, isISO8601, isURL } = validator;

export interface ValidationErrorMsg {
    id?: string;
    titel?: string;
    genre?: string;
    bewertung?: string;
    studio?: string;
    datum?: string;
    filmNr?: string;
    homepage?: string;
}

/* eslint-disable max-lines-per-function, no-null/no-null */
export const validateFilm = (film: Film) => {
    const err: ValidationErrorMsg = {};
    const { titel, genre, bewertung, studio, datum, filmNr, homepage } = film;

    if (titel === undefined || titel === null || titel === '') {
        err.titel = 'Ein Film muss einen Titel haben.';
    } else if (!/^\w.*/u.test(titel)) {
        err.titel =
            'Ein Filmtitel muss mit einem Buchstaben, einer Ziffer oder _ beginnen.';
    }

    if (genre === undefined || genre === null || genre === '') {
        err.genre = 'Die Art eines Filmes muss gesetzt sein';
    } else if (
        (genre as unknown) !== 'ACTION' &&
        (genre as unknown) !== 'SCIENCE_FICTION'
    ) {
        err.genre =
            'Das Genre eines Filmes muss ACTION oder SCIENCE_FICTION sein.';
    }

    if (
        bewertung !== undefined &&
        bewertung !== null &&
        (bewertung < 0 || bewertung > MAX_RATING)
    ) {
        err.bewertung = `${bewertung} ist keine gueltige Bewertung.`;
    }

    if (studio === undefined || studio === null || studio === '') {
        err.studio = 'Das Studio des Filmes muss gesetzt sein.';
    } else if (
        (studio as unknown) !== 'UNIVERSAL' &&
        (studio as unknown) !== 'DISNEY'
    ) {
        err.studio = 'Das Studio eines Filmes muss UNIVERSAL oder DISNEY sein.';
    }

    if (typeof datum === 'string' && !isISO8601(datum)) {
        err.datum = `'${datum}' ist kein gueltiges Datum (yyyy-MM-dd).`;
    }

    if (
        filmNr !== undefined &&
        filmNr !== null &&
        (typeof filmNr !== 'string' || !isISBN(filmNr))
    ) {
        err.filmNr = `'${filmNr}' ist keine gueltige FILM-Nummer.`;
    }

    // Falls "preis" ein string ist: Pruefung z.B. 12.30
    // if (isPresent(preis) && !isCurrency(`${preis}`)) {
    //     err.preis = `${preis} ist kein gueltiger Preis`
    // }
    if (
        homepage !== undefined &&
        homepage !== null &&
        (typeof homepage !== 'string' || !isURL(homepage))
    ) {
        err.homepage = `'${homepage}' ist keine gueltige URL.`;
    }

    logger.debug(`validateFilm: err=${JSON5.stringify(err)}`);
    return Object.entries(err).length === 0 ? undefined : err;
};
/* eslint-enable max-lines-per-function, no-null/no-null */

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
exports.BuchModel = exports.buchSchema = void 0;
const mongoose_1 = require("mongoose");
const shared_1 = require("../../shared");
// RFC version 1: timestamps            https://github.com/uuidjs/uuid#uuidv1options-buffer-offset
// RFC version 3: namespace mit MD5     https://github.com/uuidjs/uuid#uuidv3name-namespace-buffer-offset
// RFC version 4: random                https://github.com/uuidjs/uuid#uuidv4options-buffer-offset
// RFC version 5: namespace mit SHA-1   https://github.com/uuidjs/uuid#uuidv5name-namespace-buffer-offset
const uuid_1 = require("uuid");
// Eine Collection in MongoDB besteht aus Dokumenten im BSON-Format
mongoose_1.set('debug', true);
// Mongoose ist von Valeri Karpov, der auch den Begriff "MEAN-Stack" gepraegt hat:
// http://thecodebarbarian.com/2013/04/29//easy-web-prototyping-with-mongodb-and-nodejs
// Ein Schema in Mongoose definiert die Struktur und Methoden fuer die
// Dokumente in einer Collection.
// Ein Property im Schema definiert eine Property fuer jedes Dokument.
// Ein Schematyp (String, Number, Boolean, Date, Array, ObjectId) legt den Typ
// der Property fest.
// Objection.js ist ein alternatives Werkzeug für ORM:
// http://vincit.github.io/objection.js
// https://mongoosejs.com/docs/schematypes.html
exports.buchSchema = new mongoose_1.Schema({
    // MongoDB erstellt implizit einen Index fuer _id
    // mongoose-id-assigner hat geringe Download-Zahlen und
    // uuid-mongodb hat keine Typ-Definitionen fuer TypeScript
    _id: { type: String, default: uuid_1.v4 },
    titel: { type: String, required: true, unique: true },
    rating: { type: Number, min: 0, max: 5 },
    art: { type: String, enum: ['DRUCKAUSGABE', 'KINDLE'] },
    verlag: {
        type: String,
        required: true,
        enum: ['FOO_VERLAG', 'BAR_VERLAG'],
    },
    preis: { type: Number, required: true },
    rabatt: Number,
    lieferbar: Boolean,
    datum: Date,
    isbn: { type: String, required: true, unique: true, immutable: true },
    homepage: String,
    schlagwoerter: { type: [String], sparse: true },
    // "anything goes"
    autoren: [mongoose_1.Schema.Types.Mixed],
}, {
    // default: virtueller getter "id"
    // id: true,
    // createdAt und updatedAt als automatisch gepflegte Felder
    timestamps: true,
    // http://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html
    // @ts-expect-error optimisticConcurrency ab 5.10, @types/mongoose ist fuer 5.7
    optimisticConcurrency: true,
    autoIndex: shared_1.autoIndex,
});
// Optimistische Synchronisation durch das Feld __v fuer die Versionsnummer
exports.buchSchema.plugin(shared_1.optimistic);
// Methoden zum Schema hinzufuegen, damit sie spaeter beim Model (s.u.)
// verfuegbar sind, was aber bei buch.check() zu eines TS-Syntaxfehler fuehrt:
// schema.methods.check = () => {...}
// schema.statics.findByTitel =
//     (titel: string, cb: Function) =>
//         return this.find({titel: titel}, cb)
// Ein Model ist ein uebersetztes Schema und stellt die CRUD-Operationen fuer
// die Dokumente bereit, d.h. das Pattern "Active Record" wird realisiert.
// Name des Models = Name der Collection
exports.BuchModel = mongoose_1.model('Buch', exports.buchSchema); // eslint-disable-line @typescript-eslint/naming-convention
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVjaC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idWNoL2VudGl0eS9idWNoLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUVILHVDQUE4QztBQUM5Qyx5Q0FBcUQ7QUFDckQsa0dBQWtHO0FBQ2xHLHlHQUF5RztBQUN6RyxrR0FBa0c7QUFDbEcseUdBQXlHO0FBQ3pHLCtCQUFrQztBQUVsQyxtRUFBbUU7QUFFbkUsY0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVuQixrRkFBa0Y7QUFDbEYsdUZBQXVGO0FBQ3ZGLHNFQUFzRTtBQUN0RSxpQ0FBaUM7QUFDakMsc0VBQXNFO0FBQ3RFLDhFQUE4RTtBQUM5RSxxQkFBcUI7QUFDckIsc0RBQXNEO0FBQ3RELHVDQUF1QztBQUV2QywrQ0FBK0M7QUFDbEMsUUFBQSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUNoQztJQUNJLGlEQUFpRDtJQUNqRCx1REFBdUQ7SUFDdkQsMERBQTBEO0lBQzFELEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQUksRUFBRTtJQUNwQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUNyRCxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUN4QyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsRUFBRTtJQUN2RCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztLQUlyQztJQUNELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxNQUFNLEVBQUUsTUFBTTtJQUNkLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLEtBQUssRUFBRSxJQUFJO0lBQ1gsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtJQUNyRSxRQUFRLEVBQUUsTUFBTTtJQUNoQixhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQy9DLGtCQUFrQjtJQUNsQixPQUFPLEVBQUUsQ0FBQyxpQkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Q0FDaEMsRUFDRDtJQUNJLGtDQUFrQztJQUNsQyxZQUFZO0lBRVosMkRBQTJEO0lBQzNELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLHFGQUFxRjtJQUNyRiwrRUFBK0U7SUFDL0UscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixTQUFTLEVBQVQsa0JBQVM7Q0FDWixDQUNKLENBQUM7QUFFRiwyRUFBMkU7QUFDM0Usa0JBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQVUsQ0FBQyxDQUFDO0FBRTlCLHVFQUF1RTtBQUN2RSw4RUFBOEU7QUFDOUUscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkMsK0NBQStDO0FBRS9DLDZFQUE2RTtBQUM3RSwwRUFBMEU7QUFDMUUsd0NBQXdDO0FBQzNCLFFBQUEsU0FBUyxHQUFHLGdCQUFLLENBQUMsTUFBTSxFQUFFLGtCQUFVLENBQUMsQ0FBQyxDQUFDLDJEQUEyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IFNjaGVtYSwgbW9kZWwsIHNldCB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IGF1dG9JbmRleCwgb3B0aW1pc3RpYyB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG4vLyBSRkMgdmVyc2lvbiAxOiB0aW1lc3RhbXBzICAgICAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI3V1aWR2MW9wdGlvbnMtYnVmZmVyLW9mZnNldFxuLy8gUkZDIHZlcnNpb24gMzogbmFtZXNwYWNlIG1pdCBNRDUgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCN1dWlkdjNuYW1lLW5hbWVzcGFjZS1idWZmZXItb2Zmc2V0XG4vLyBSRkMgdmVyc2lvbiA0OiByYW5kb20gICAgICAgICAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI3V1aWR2NG9wdGlvbnMtYnVmZmVyLW9mZnNldFxuLy8gUkZDIHZlcnNpb24gNTogbmFtZXNwYWNlIG1pdCBTSEEtMSAgIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCN1dWlkdjVuYW1lLW5hbWVzcGFjZS1idWZmZXItb2Zmc2V0XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbi8vIEVpbmUgQ29sbGVjdGlvbiBpbiBNb25nb0RCIGJlc3RlaHQgYXVzIERva3VtZW50ZW4gaW0gQlNPTi1Gb3JtYXRcblxuc2V0KCdkZWJ1ZycsIHRydWUpO1xuXG4vLyBNb25nb29zZSBpc3Qgdm9uIFZhbGVyaSBLYXJwb3YsIGRlciBhdWNoIGRlbiBCZWdyaWZmIFwiTUVBTi1TdGFja1wiIGdlcHJhZWd0IGhhdDpcbi8vIGh0dHA6Ly90aGVjb2RlYmFyYmFyaWFuLmNvbS8yMDEzLzA0LzI5Ly9lYXN5LXdlYi1wcm90b3R5cGluZy13aXRoLW1vbmdvZGItYW5kLW5vZGVqc1xuLy8gRWluIFNjaGVtYSBpbiBNb25nb29zZSBkZWZpbmllcnQgZGllIFN0cnVrdHVyIHVuZCBNZXRob2RlbiBmdWVyIGRpZVxuLy8gRG9rdW1lbnRlIGluIGVpbmVyIENvbGxlY3Rpb24uXG4vLyBFaW4gUHJvcGVydHkgaW0gU2NoZW1hIGRlZmluaWVydCBlaW5lIFByb3BlcnR5IGZ1ZXIgamVkZXMgRG9rdW1lbnQuXG4vLyBFaW4gU2NoZW1hdHlwIChTdHJpbmcsIE51bWJlciwgQm9vbGVhbiwgRGF0ZSwgQXJyYXksIE9iamVjdElkKSBsZWd0IGRlbiBUeXBcbi8vIGRlciBQcm9wZXJ0eSBmZXN0LlxuLy8gT2JqZWN0aW9uLmpzIGlzdCBlaW4gYWx0ZXJuYXRpdmVzIFdlcmt6ZXVnIGbDvHIgT1JNOlxuLy8gaHR0cDovL3ZpbmNpdC5naXRodWIuaW8vb2JqZWN0aW9uLmpzXG5cbi8vIGh0dHBzOi8vbW9uZ29vc2Vqcy5jb20vZG9jcy9zY2hlbWF0eXBlcy5odG1sXG5leHBvcnQgY29uc3QgYnVjaFNjaGVtYSA9IG5ldyBTY2hlbWEoXG4gICAge1xuICAgICAgICAvLyBNb25nb0RCIGVyc3RlbGx0IGltcGxpeml0IGVpbmVuIEluZGV4IGZ1ZXIgX2lkXG4gICAgICAgIC8vIG1vbmdvb3NlLWlkLWFzc2lnbmVyIGhhdCBnZXJpbmdlIERvd25sb2FkLVphaGxlbiB1bmRcbiAgICAgICAgLy8gdXVpZC1tb25nb2RiIGhhdCBrZWluZSBUeXAtRGVmaW5pdGlvbmVuIGZ1ZXIgVHlwZVNjcmlwdFxuICAgICAgICBfaWQ6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiB1dWlkIH0sIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIHRpdGVsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICAgICAgICByYXRpbmc6IHsgdHlwZTogTnVtYmVyLCBtaW46IDAsIG1heDogNSB9LFxuICAgICAgICBhcnQ6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ0RSVUNLQVVTR0FCRScsICdLSU5ETEUnXSB9LFxuICAgICAgICB2ZXJsYWc6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgZW51bTogWydGT09fVkVSTEFHJywgJ0JBUl9WRVJMQUcnXSxcbiAgICAgICAgICAgIC8vIGVzIGdpYnQgYXVjaFxuICAgICAgICAgICAgLy8gIGxvd2VyY2FzZTogdHJ1ZVxuICAgICAgICAgICAgLy8gIHVwcGVyY2FzZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBwcmVpczogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgICAgIHJhYmF0dDogTnVtYmVyLFxuICAgICAgICBsaWVmZXJiYXI6IEJvb2xlYW4sXG4gICAgICAgIGRhdHVtOiBEYXRlLFxuICAgICAgICBpc2JuOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgaW1tdXRhYmxlOiB0cnVlIH0sXG4gICAgICAgIGhvbWVwYWdlOiBTdHJpbmcsXG4gICAgICAgIHNjaGxhZ3dvZXJ0ZXI6IHsgdHlwZTogW1N0cmluZ10sIHNwYXJzZTogdHJ1ZSB9LFxuICAgICAgICAvLyBcImFueXRoaW5nIGdvZXNcIlxuICAgICAgICBhdXRvcmVuOiBbU2NoZW1hLlR5cGVzLk1peGVkXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgLy8gZGVmYXVsdDogdmlydHVlbGxlciBnZXR0ZXIgXCJpZFwiXG4gICAgICAgIC8vIGlkOiB0cnVlLFxuXG4gICAgICAgIC8vIGNyZWF0ZWRBdCB1bmQgdXBkYXRlZEF0IGFscyBhdXRvbWF0aXNjaCBnZXBmbGVndGUgRmVsZGVyXG4gICAgICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgICAgIC8vIGh0dHA6Ly90aGVjb2RlYmFyYmFyaWFuLmNvbS93aGF0cy1uZXctaW4tbW9uZ29vc2UtNS0xMC1vcHRpbWlzdGljLWNvbmN1cnJlbmN5Lmh0bWxcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBvcHRpbWlzdGljQ29uY3VycmVuY3kgYWIgNS4xMCwgQHR5cGVzL21vbmdvb3NlIGlzdCBmdWVyIDUuN1xuICAgICAgICBvcHRpbWlzdGljQ29uY3VycmVuY3k6IHRydWUsXG4gICAgICAgIGF1dG9JbmRleCxcbiAgICB9LFxuKTtcblxuLy8gT3B0aW1pc3Rpc2NoZSBTeW5jaHJvbmlzYXRpb24gZHVyY2ggZGFzIEZlbGQgX192IGZ1ZXIgZGllIFZlcnNpb25zbnVtbWVyXG5idWNoU2NoZW1hLnBsdWdpbihvcHRpbWlzdGljKTtcblxuLy8gTWV0aG9kZW4genVtIFNjaGVtYSBoaW56dWZ1ZWdlbiwgZGFtaXQgc2llIHNwYWV0ZXIgYmVpbSBNb2RlbCAocy51Lilcbi8vIHZlcmZ1ZWdiYXIgc2luZCwgd2FzIGFiZXIgYmVpIGJ1Y2guY2hlY2soKSB6dSBlaW5lcyBUUy1TeW50YXhmZWhsZXIgZnVlaHJ0OlxuLy8gc2NoZW1hLm1ldGhvZHMuY2hlY2sgPSAoKSA9PiB7Li4ufVxuLy8gc2NoZW1hLnN0YXRpY3MuZmluZEJ5VGl0ZWwgPVxuLy8gICAgICh0aXRlbDogc3RyaW5nLCBjYjogRnVuY3Rpb24pID0+XG4vLyAgICAgICAgIHJldHVybiB0aGlzLmZpbmQoe3RpdGVsOiB0aXRlbH0sIGNiKVxuXG4vLyBFaW4gTW9kZWwgaXN0IGVpbiB1ZWJlcnNldHp0ZXMgU2NoZW1hIHVuZCBzdGVsbHQgZGllIENSVUQtT3BlcmF0aW9uZW4gZnVlclxuLy8gZGllIERva3VtZW50ZSBiZXJlaXQsIGQuaC4gZGFzIFBhdHRlcm4gXCJBY3RpdmUgUmVjb3JkXCIgd2lyZCByZWFsaXNpZXJ0LlxuLy8gTmFtZSBkZXMgTW9kZWxzID0gTmFtZSBkZXIgQ29sbGVjdGlvblxuZXhwb3J0IGNvbnN0IEJ1Y2hNb2RlbCA9IG1vZGVsKCdCdWNoJywgYnVjaFNjaGVtYSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXG4iXX0=
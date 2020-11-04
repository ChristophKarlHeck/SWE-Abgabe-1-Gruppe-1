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
exports.MultipleFiles = exports.FileNotFound = exports.BuchFileServiceError = exports.BuchNotExists = exports.VersionOutdated = exports.VersionInvalid = exports.IsbnExists = exports.TitelExists = exports.BuchInvalid = exports.BuchServiceError = void 0;
class BuchServiceError {
} // eslint-disable-line @typescript-eslint/no-extraneous-class
exports.BuchServiceError = BuchServiceError;
class BuchInvalid extends BuchServiceError {
    constructor(msg) {
        super();
        this.msg = msg;
    }
}
exports.BuchInvalid = BuchInvalid;
class TitelExists extends BuchServiceError {
    constructor(titel, id) {
        super();
        this.titel = titel;
        this.id = id;
    }
}
exports.TitelExists = TitelExists;
class IsbnExists extends BuchServiceError {
    constructor(isbn, id) {
        super();
        this.isbn = isbn;
        this.id = id;
    }
}
exports.IsbnExists = IsbnExists;
class VersionInvalid extends BuchServiceError {
    constructor(version) {
        super();
        this.version = version;
    }
}
exports.VersionInvalid = VersionInvalid;
class VersionOutdated extends BuchServiceError {
    constructor(id, version) {
        super();
        this.id = id;
        this.version = version;
    }
}
exports.VersionOutdated = VersionOutdated;
class BuchNotExists extends BuchServiceError {
    constructor(id) {
        super();
        this.id = id;
    }
}
exports.BuchNotExists = BuchNotExists;
class BuchFileServiceError {
} // eslint-disable-line @typescript-eslint/no-extraneous-class
exports.BuchFileServiceError = BuchFileServiceError;
class FileNotFound extends BuchFileServiceError {
    constructor(filename) {
        super();
        this.filename = filename;
    }
}
exports.FileNotFound = FileNotFound;
class MultipleFiles extends BuchFileServiceError {
    constructor(filename) {
        super();
        this.filename = filename;
    }
}
exports.MultipleFiles = MultipleFiles;
/* eslint-enable max-classes-per-file, @typescript-eslint/no-type-alias */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1Y2gvc2VydmljZS9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBTUgsTUFBYSxnQkFBZ0I7Q0FBRyxDQUFDLDZEQUE2RDtBQUE5Riw0Q0FBZ0M7QUFFaEMsTUFBYSxXQUFZLFNBQVEsZ0JBQWdCO0lBQzdDLFlBQXFCLEdBQXVCO1FBQ3hDLEtBQUssRUFBRSxDQUFDO1FBRFMsUUFBRyxHQUFILEdBQUcsQ0FBb0I7SUFFNUMsQ0FBQztDQUNKO0FBSkQsa0NBSUM7QUFFRCxNQUFhLFdBQVksU0FBUSxnQkFBZ0I7SUFDN0MsWUFBcUIsS0FBYSxFQUFXLEVBQVU7UUFDbkQsS0FBSyxFQUFFLENBQUM7UUFEUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVcsT0FBRSxHQUFGLEVBQUUsQ0FBUTtJQUV2RCxDQUFDO0NBQ0o7QUFKRCxrQ0FJQztBQUVELE1BQWEsVUFBVyxTQUFRLGdCQUFnQjtJQUM1QyxZQUFxQixJQUFZLEVBQVcsRUFBVTtRQUNsRCxLQUFLLEVBQUUsQ0FBQztRQURTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVyxPQUFFLEdBQUYsRUFBRSxDQUFRO0lBRXRELENBQUM7Q0FDSjtBQUpELGdDQUlDO0FBSUQsTUFBYSxjQUFlLFNBQVEsZ0JBQWdCO0lBQ2hELFlBQXFCLE9BQTJCO1FBQzVDLEtBQUssRUFBRSxDQUFDO1FBRFMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFFaEQsQ0FBQztDQUNKO0FBSkQsd0NBSUM7QUFFRCxNQUFhLGVBQWdCLFNBQVEsZ0JBQWdCO0lBQ2pELFlBQXFCLEVBQVUsRUFBVyxPQUFlO1FBQ3JELEtBQUssRUFBRSxDQUFDO1FBRFMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFFekQsQ0FBQztDQUNKO0FBSkQsMENBSUM7QUFFRCxNQUFhLGFBQWMsU0FBUSxnQkFBZ0I7SUFDL0MsWUFBcUIsRUFBc0I7UUFDdkMsS0FBSyxFQUFFLENBQUM7UUFEUyxPQUFFLEdBQUYsRUFBRSxDQUFvQjtJQUUzQyxDQUFDO0NBQ0o7QUFKRCxzQ0FJQztBQVNELE1BQWEsb0JBQW9CO0NBQUcsQ0FBQyw2REFBNkQ7QUFBbEcsb0RBQW9DO0FBRXBDLE1BQWEsWUFBYSxTQUFRLG9CQUFvQjtJQUNsRCxZQUFxQixRQUFnQjtRQUNqQyxLQUFLLEVBQUUsQ0FBQztRQURTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFFckMsQ0FBQztDQUNKO0FBSkQsb0NBSUM7QUFFRCxNQUFhLGFBQWMsU0FBUSxvQkFBb0I7SUFDbkQsWUFBcUIsUUFBZ0I7UUFDakMsS0FBSyxFQUFFLENBQUM7UUFEUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBRXJDLENBQUM7Q0FDSjtBQUpELHNDQUlDO0FBSUQsMEVBQTBFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxNiAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUsIEB0eXBlc2NyaXB0LWVzbGludC9uby10eXBlLWFsaWFzICovXG5cbmltcG9ydCB0eXBlIHsgVmFsaWRhdGlvbkVycm9yTXNnIH0gZnJvbSAnLi8uLi9lbnRpdHknO1xuXG5leHBvcnQgY2xhc3MgQnVjaFNlcnZpY2VFcnJvciB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHRyYW5lb3VzLWNsYXNzXG5cbmV4cG9ydCBjbGFzcyBCdWNoSW52YWxpZCBleHRlbmRzIEJ1Y2hTZXJ2aWNlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1zZzogVmFsaWRhdGlvbkVycm9yTXNnKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGl0ZWxFeGlzdHMgZXh0ZW5kcyBCdWNoU2VydmljZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSB0aXRlbDogc3RyaW5nLCByZWFkb25seSBpZDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSXNibkV4aXN0cyBleHRlbmRzIEJ1Y2hTZXJ2aWNlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlzYm46IHN0cmluZywgcmVhZG9ubHkgaWQ6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRXJyb3IgPSBCdWNoSW52YWxpZCB8IFRpdGVsRXhpc3RzIHwgSXNibkV4aXN0cztcblxuZXhwb3J0IGNsYXNzIFZlcnNpb25JbnZhbGlkIGV4dGVuZHMgQnVjaFNlcnZpY2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgdmVyc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmVyc2lvbk91dGRhdGVkIGV4dGVuZHMgQnVjaFNlcnZpY2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgdmVyc2lvbjogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnVjaE5vdEV4aXN0cyBleHRlbmRzIEJ1Y2hTZXJ2aWNlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZUVycm9yID1cbiAgICB8IEJ1Y2hJbnZhbGlkXG4gICAgfCBCdWNoTm90RXhpc3RzXG4gICAgfCBUaXRlbEV4aXN0c1xuICAgIHwgVmVyc2lvbkludmFsaWRcbiAgICB8IFZlcnNpb25PdXRkYXRlZDtcblxuZXhwb3J0IGNsYXNzIEJ1Y2hGaWxlU2VydmljZUVycm9yIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhbmVvdXMtY2xhc3NcblxuZXhwb3J0IGNsYXNzIEZpbGVOb3RGb3VuZCBleHRlbmRzIEJ1Y2hGaWxlU2VydmljZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVGaWxlcyBleHRlbmRzIEJ1Y2hGaWxlU2VydmljZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb3dubG9hZEVycm9yID0gQnVjaE5vdEV4aXN0cyB8IEZpbGVOb3RGb3VuZCB8IE11bHRpcGxlRmlsZXM7XG5cbi8qIGVzbGludC1lbmFibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUsIEB0eXBlc2NyaXB0LWVzbGludC9uby10eXBlLWFsaWFzICovXG4iXX0=
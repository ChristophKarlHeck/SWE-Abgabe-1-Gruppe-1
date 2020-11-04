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
exports.download = exports.upload = exports.deleteFn = exports.update = exports.create = exports.find = exports.findById = void 0;
const buch_file_request_handler_1 = require("./buch-file.request-handler");
const buch_request_handler_1 = require("./buch.request-handler");
const handler = new buch_request_handler_1.BuchRequestHandler();
const fileHandler = new buch_file_request_handler_1.BuchFileRequestHandler();
const findById = (req, res) => handler.findById(req, res);
exports.findById = findById;
const find = (req, res) => handler.find(req, res);
exports.find = find;
const create = (req, res) => handler.create(req, res);
exports.create = create;
const update = (req, res) => handler.update(req, res);
exports.update = update;
const deleteFn = (req, res) => handler.delete(req, res);
exports.deleteFn = deleteFn;
const upload = (req, res) => fileHandler.upload(req, res);
exports.upload = upload;
const download = (req, res) => fileHandler.download(req, res);
exports.download = download;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVjaC9yZXN0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUdILDJFQUFxRTtBQUNyRSxpRUFBNEQ7QUFFNUQsTUFBTSxPQUFPLEdBQUcsSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO0FBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksa0RBQXNCLEVBQUUsQ0FBQztBQUUxQyxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUNwRCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQURsQixRQUFBLFFBQVEsWUFDVTtBQUN4QixNQUFNLElBQUksR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQS9ELFFBQUEsSUFBSSxRQUEyRDtBQUNyRSxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQW5FLFFBQUEsTUFBTSxVQUE2RDtBQUN6RSxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQW5FLFFBQUEsTUFBTSxVQUE2RDtBQUN6RSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQURoQixRQUFBLFFBQVEsWUFDUTtBQUN0QixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUNsRCxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQURwQixRQUFBLE1BQU0sVUFDYztBQUMxQixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRSxDQUNwRCxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUR0QixRQUFBLFFBQVEsWUFDYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB0eXBlIHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEJ1Y2hGaWxlUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL2J1Y2gtZmlsZS5yZXF1ZXN0LWhhbmRsZXInO1xuaW1wb3J0IHsgQnVjaFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnLi9idWNoLnJlcXVlc3QtaGFuZGxlcic7XG5cbmNvbnN0IGhhbmRsZXIgPSBuZXcgQnVjaFJlcXVlc3RIYW5kbGVyKCk7XG5jb25zdCBmaWxlSGFuZGxlciA9IG5ldyBCdWNoRmlsZVJlcXVlc3RIYW5kbGVyKCk7XG5cbmV4cG9ydCBjb25zdCBmaW5kQnlJZCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+XG4gICAgaGFuZGxlci5maW5kQnlJZChyZXEsIHJlcyk7XG5leHBvcnQgY29uc3QgZmluZCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IGhhbmRsZXIuZmluZChyZXEsIHJlcyk7XG5leHBvcnQgY29uc3QgY3JlYXRlID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4gaGFuZGxlci5jcmVhdGUocmVxLCByZXMpO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZSA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IGhhbmRsZXIudXBkYXRlKHJlcSwgcmVzKTtcbmV4cG9ydCBjb25zdCBkZWxldGVGbiA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+XG4gICAgaGFuZGxlci5kZWxldGUocmVxLCByZXMpO1xuZXhwb3J0IGNvbnN0IHVwbG9hZCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+XG4gICAgZmlsZUhhbmRsZXIudXBsb2FkKHJlcSwgcmVzKTtcbmV4cG9ydCBjb25zdCBkb3dubG9hZCA9IChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+XG4gICAgZmlsZUhhbmRsZXIuZG93bmxvYWQocmVxLCByZXMpO1xuIl19
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
exports.suche = void 0;
const buch_service_1 = require("../service/buch.service");
const logger_1 = require("./../../shared/logger");
const buchService = new buch_service_1.BuchService();
const suche = async (req, res) => {
    logger_1.logger.error(`suche(): ${req.url}`);
    const buecher = await buchService.find();
    res.render('suche', { title: 'Suche', buecher });
};
exports.suche = suche;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVjaC9odG1sL3N1Y2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUdILDBEQUFzRDtBQUN0RCxrREFBK0M7QUFFL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7QUFFL0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxFQUFFLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN2RCxlQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBSlcsUUFBQSxLQUFLLFNBSWhCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOCAtIHByZXNlbnQgSnVlcmdlbiBaaW1tZXJtYW5uLCBIb2Noc2NodWxlIEthcmxzcnVoZVxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgQnVjaFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2J1Y2guc2VydmljZSc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9sb2dnZXInO1xuXG5jb25zdCBidWNoU2VydmljZSA9IG5ldyBCdWNoU2VydmljZSgpO1xuXG5leHBvcnQgY29uc3Qgc3VjaGUgPSBhc3luYyAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGBzdWNoZSgpOiAke3JlcS51cmx9YCk7XG4gICAgY29uc3QgYnVlY2hlciA9IGF3YWl0IGJ1Y2hTZXJ2aWNlLmZpbmQoKTtcbiAgICByZXMucmVuZGVyKCdzdWNoZScsIHsgdGl0bGU6ICdTdWNoZScsIGJ1ZWNoZXIgfSk7XG59O1xuIl19
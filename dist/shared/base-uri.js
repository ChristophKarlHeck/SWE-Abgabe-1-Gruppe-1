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
exports.getBaseUri = void 0;
const config_1 = require("./config");
const { cloud } = config_1.serverConfig;
const port = cloud === undefined ? `:${config_1.serverConfig.port}` : '';
const getBaseUri = (req) => {
    const { protocol, hostname, baseUrl } = req;
    const schema = cloud === config_1.Cloud.HEROKU ? 'https' : protocol;
    return `${schema}://${hostname}${port}${baseUrl}`;
};
exports.getBaseUri = getBaseUri;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS11cmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2hhcmVkL2Jhc2UtdXJpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7OztBQUVILHFDQUErQztBQUcvQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcscUJBQVksQ0FBQztBQUMvQixNQUFNLElBQUksR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLHFCQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUV6RCxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUM1QyxNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssY0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDM0QsT0FBTyxHQUFHLE1BQU0sTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RELENBQUMsQ0FBQztBQUpXLFFBQUEsVUFBVSxjQUlyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbmltcG9ydCB7IENsb3VkLCBzZXJ2ZXJDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcblxuY29uc3QgeyBjbG91ZCB9ID0gc2VydmVyQ29uZmlnO1xuY29uc3QgcG9ydCA9IGNsb3VkID09PSB1bmRlZmluZWQgPyBgOiR7c2VydmVyQ29uZmlnLnBvcnR9YCA6ICcnO1xuXG5leHBvcnQgY29uc3QgZ2V0QmFzZVVyaSA9IChyZXE6IFJlcXVlc3QpID0+IHtcbiAgICBjb25zdCB7IHByb3RvY29sLCBob3N0bmFtZSwgYmFzZVVybCB9ID0gcmVxO1xuICAgIGNvbnN0IHNjaGVtYSA9IGNsb3VkID09PSBDbG91ZC5IRVJPS1UgPyAnaHR0cHMnIDogcHJvdG9jb2w7XG4gICAgcmV0dXJuIGAke3NjaGVtYX06Ly8ke2hvc3RuYW1lfSR7cG9ydH0ke2Jhc2VVcmx9YDtcbn07XG4iXX0=
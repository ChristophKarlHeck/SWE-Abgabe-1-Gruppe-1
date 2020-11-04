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
exports.helmetHandlers = void 0;
// Alternative zu helmet: lusca von Kraken
const helmet_1 = require("helmet");
// https://blog.appcanary.com/2017/http-security-headers.html
exports.helmetHandlers = [
    // CSP = Content Security Policy
    //   https://www.owasp.org/index.php/HTTP_Strict_Transport_Security
    //   https://tools.ietf.org/html/rfc7762
    helmet_1.contentSecurityPolicy({
        directives: {
            /* eslint-disable quotes */
            defaultSrc: ["https: 'self'"],
            // fuer Chrome mit dem Add-on JSONView
            styleSrc: ["https: 'unsafe-inline'"],
            // fuer GraphQL IDE => GraphiQL
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
            scriptSrc: ["https: 'unsafe-inline' 'unsafe-eval'"],
            // fuer GraphQL IDE => GraphiQL
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src
            imgSrc: ["data: 'self'"],
        },
    }),
    // XSS = Cross-site scripting attacks: Header X-XSS-Protection
    //   https://www.owasp.org/index.php/Cross-site_scripting
    helmet_1.xssFilter(),
    // Clickjacking
    //   https://www.owasp.org/index.php/Clickjacking
    //   http://tools.ietf.org/html/rfc7034
    helmet_1.frameguard(),
    // HSTS = HTTP Strict Transport Security:
    //   Header Strict-Transport-Security
    //   https://www.owasp.org/index.php/HTTP_Strict_Transport_Security
    //   https://tools.ietf.org/html/rfc6797
    helmet_1.hsts(),
    // MIME-sniffing: im Header X-Content-Type-Options
    //   https://blogs.msdn.microsoft.com/ie/2008/09/02/ie8-security-part-vi-beta-2-update
    //   http://msdn.microsoft.com/en-us/library/gg622941%28v=vs.85%29.aspx
    //   https://tools.ietf.org/html/rfc7034
    helmet_1.noSniff(),
    // Im Header "X-Powered-By: Express" unterdruecken
    helmet_1.hidePoweredBy(),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbWV0LmhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VjdXJpdHkvaGVsbWV0LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBRUgsMENBQTBDO0FBQzFDLG1DQU9nQjtBQUVoQiw2REFBNkQ7QUFDaEQsUUFBQSxjQUFjLEdBQUc7SUFDMUIsZ0NBQWdDO0lBQ2hDLG1FQUFtRTtJQUNuRSx3Q0FBd0M7SUFDeEMsOEJBQXFCLENBQUM7UUFDbEIsVUFBVSxFQUFFO1lBQ1IsMkJBQTJCO1lBQzNCLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUM3QixzQ0FBc0M7WUFDdEMsUUFBUSxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDcEMsK0JBQStCO1lBQy9CLCtGQUErRjtZQUMvRixTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztZQUNuRCwrQkFBK0I7WUFDL0IsNEZBQTRGO1lBQzVGLE1BQU0sRUFBRSxDQUFDLGNBQWMsQ0FBQztTQUUzQjtLQUNKLENBQUM7SUFFRiw4REFBOEQ7SUFDOUQseURBQXlEO0lBQ3pELGtCQUFTLEVBQUU7SUFFWCxlQUFlO0lBQ2YsaURBQWlEO0lBQ2pELHVDQUF1QztJQUN2QyxtQkFBVSxFQUFFO0lBRVoseUNBQXlDO0lBQ3pDLHFDQUFxQztJQUNyQyxtRUFBbUU7SUFDbkUsd0NBQXdDO0lBQ3hDLGFBQUksRUFBRTtJQUVOLGtEQUFrRDtJQUNsRCxzRkFBc0Y7SUFDdEYsdUVBQXVFO0lBQ3ZFLHdDQUF3QztJQUN4QyxnQkFBTyxFQUFFO0lBRVQsa0RBQWtEO0lBQ2xELHNCQUFhLEVBQUU7Q0FDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTYgLSBwcmVzZW50IEp1ZXJnZW4gWmltbWVybWFubiwgSG9jaHNjaHVsZSBLYXJsc3J1aGVcbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggdGhpcyBwcm9ncmFtLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5cbi8vIEFsdGVybmF0aXZlIHp1IGhlbG1ldDogbHVzY2Egdm9uIEtyYWtlblxuaW1wb3J0IHtcbiAgICBjb250ZW50U2VjdXJpdHlQb2xpY3ksXG4gICAgZnJhbWVndWFyZCxcbiAgICBoaWRlUG93ZXJlZEJ5LFxuICAgIGhzdHMsXG4gICAgbm9TbmlmZixcbiAgICB4c3NGaWx0ZXIsXG59IGZyb20gJ2hlbG1ldCc7XG5cbi8vIGh0dHBzOi8vYmxvZy5hcHBjYW5hcnkuY29tLzIwMTcvaHR0cC1zZWN1cml0eS1oZWFkZXJzLmh0bWxcbmV4cG9ydCBjb25zdCBoZWxtZXRIYW5kbGVycyA9IFtcbiAgICAvLyBDU1AgPSBDb250ZW50IFNlY3VyaXR5IFBvbGljeVxuICAgIC8vICAgaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9IVFRQX1N0cmljdF9UcmFuc3BvcnRfU2VjdXJpdHlcbiAgICAvLyAgIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3NzYyXG4gICAgY29udGVudFNlY3VyaXR5UG9saWN5KHtcbiAgICAgICAgZGlyZWN0aXZlczoge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgcXVvdGVzICovXG4gICAgICAgICAgICBkZWZhdWx0U3JjOiBbXCJodHRwczogJ3NlbGYnXCJdLFxuICAgICAgICAgICAgLy8gZnVlciBDaHJvbWUgbWl0IGRlbSBBZGQtb24gSlNPTlZpZXdcbiAgICAgICAgICAgIHN0eWxlU3JjOiBbXCJodHRwczogJ3Vuc2FmZS1pbmxpbmUnXCJdLFxuICAgICAgICAgICAgLy8gZnVlciBHcmFwaFFMIElERSA9PiBHcmFwaGlRTFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9IZWFkZXJzL0NvbnRlbnQtU2VjdXJpdHktUG9saWN5L3NjcmlwdC1zcmNcbiAgICAgICAgICAgIHNjcmlwdFNyYzogW1wiaHR0cHM6ICd1bnNhZmUtaW5saW5lJyAndW5zYWZlLWV2YWwnXCJdLFxuICAgICAgICAgICAgLy8gZnVlciBHcmFwaFFMIElERSA9PiBHcmFwaGlRTFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9IZWFkZXJzL0NvbnRlbnQtU2VjdXJpdHktUG9saWN5L2ltZy1zcmNcbiAgICAgICAgICAgIGltZ1NyYzogW1wiZGF0YTogJ3NlbGYnXCJdLFxuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBxdW90ZXMgKi9cbiAgICAgICAgfSxcbiAgICB9KSxcblxuICAgIC8vIFhTUyA9IENyb3NzLXNpdGUgc2NyaXB0aW5nIGF0dGFja3M6IEhlYWRlciBYLVhTUy1Qcm90ZWN0aW9uXG4gICAgLy8gICBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL0Nyb3NzLXNpdGVfc2NyaXB0aW5nXG4gICAgeHNzRmlsdGVyKCksXG5cbiAgICAvLyBDbGlja2phY2tpbmdcbiAgICAvLyAgIGh0dHBzOi8vd3d3Lm93YXNwLm9yZy9pbmRleC5waHAvQ2xpY2tqYWNraW5nXG4gICAgLy8gICBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MDM0XG4gICAgZnJhbWVndWFyZCgpLFxuXG4gICAgLy8gSFNUUyA9IEhUVFAgU3RyaWN0IFRyYW5zcG9ydCBTZWN1cml0eTpcbiAgICAvLyAgIEhlYWRlciBTdHJpY3QtVHJhbnNwb3J0LVNlY3VyaXR5XG4gICAgLy8gICBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL0hUVFBfU3RyaWN0X1RyYW5zcG9ydF9TZWN1cml0eVxuICAgIC8vICAgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3OTdcbiAgICBoc3RzKCksXG5cbiAgICAvLyBNSU1FLXNuaWZmaW5nOiBpbSBIZWFkZXIgWC1Db250ZW50LVR5cGUtT3B0aW9uc1xuICAgIC8vICAgaHR0cHM6Ly9ibG9ncy5tc2RuLm1pY3Jvc29mdC5jb20vaWUvMjAwOC8wOS8wMi9pZTgtc2VjdXJpdHktcGFydC12aS1iZXRhLTItdXBkYXRlXG4gICAgLy8gICBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvZ2c2MjI5NDElMjh2PXZzLjg1JTI5LmFzcHhcbiAgICAvLyAgIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MDM0XG4gICAgbm9TbmlmZigpLFxuXG4gICAgLy8gSW0gSGVhZGVyIFwiWC1Qb3dlcmVkLUJ5OiBFeHByZXNzXCIgdW50ZXJkcnVlY2tlblxuICAgIGhpZGVQb3dlcmVkQnkoKSxcbl07XG4iXX0=
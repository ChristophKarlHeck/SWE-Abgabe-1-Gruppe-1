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
const tslib_1 = require("tslib");
// https://github.com/i0natan/nodebestpractices
// Stacktraces mit Beruecksichtigung der TypeScript-Dateien
require("source-map-support/register");
const shared_1 = require("./shared");
const os_1 = require("os");
const json5_1 = tslib_1.__importDefault(require("json5"));
const app_1 = require("./app");
const mongoose_1 = require("mongoose");
const https_1 = require("https");
const ip_1 = tslib_1.__importDefault(require("ip"));
const strip_indent_1 = tslib_1.__importDefault(require("strip-indent"));
/* eslint-disable no-process-exit */
// Arrow Function
const disconnectDB = () => {
    mongoose_1.connection.close().catch(() => process.exit(0)); // eslint-disable-line node/no-process-exit
};
const shutdown = () => {
    shared_1.logger.info('Server wird heruntergefahren...');
    disconnectDB();
    process.exit(0); // eslint-disable-line node/no-process-exit
};
/* eslint-enable no-process-exit */
// Destructuring
const { cloud, host, port } = shared_1.serverConfig;
const printBanner = () => {
    // Heroku entfernt fuehrende Leerzeichen
    const banner = `

        .       __                                    _____
        .      / /_  _____  _________ ____  ____     /__  /
        . __  / / / / / _ \\/ ___/ __ \`/ _ \\/ __ \\      / /
        ./ /_/ / /_/ /  __/ /  / /_/ /  __/ / / /     / /___
        .\\____/\\__,_/\\___/_/   \\__, /\\___/_/ /_/     /____(_)
        .                     /____/

    `;
    shared_1.logger.info(strip_indent_1.default(banner));
    // https://nodejs.org/api/process.html
    shared_1.logger.info(`Node:           ${process.version}`);
    shared_1.logger.info(`Betriebssystem: ${os_1.type()} ${os_1.release()}`);
    shared_1.logger.info(`Rechnername:    ${host}`);
    shared_1.logger.info(`IP-Adresse:     ${ip_1.default.address()}`);
    shared_1.logger.info('');
    if (cloud === undefined) {
        shared_1.logger.info(`https://${host}:${port} ist gestartet: Herunterfahren durch <Strg>C`);
    }
    else {
        shared_1.logger.info('Der Server ist gestartet: Herunterfahren durch <Strg>C');
    }
};
const startServer = () => {
    let server;
    if (cloud === undefined) {
        const { cert, key } = shared_1.serverConfig;
        // Shorthand Properties
        const options = {
            key,
            cert,
            minVersion: 'TLSv1.3',
        };
        // https://stackoverflow.com/questions/11744975/enabling-https-on-express-js#answer-11745114
        server = https_1.createServer(options, app_1.app);
    }
    else {
        server = app_1.app;
    }
    server.listen(port, printBanner);
    // util.promisify(fn) funktioniert nur mit Funktionen, bei denen
    // der error-Callback das erste Funktionsargument ist
    // <Strg>C
    process.on('SIGINT', shutdown);
    // nodemon nutzt SIGUSR2
    process.once('SIGUSR2', disconnectDB);
    // Falls bei einem Promise die Fehlerbehandlung fehlt
    process.on('unhandledRejection', (err) => {
        shared_1.logger.error('unhandled rejection', err);
    });
};
// IIFE (= Immediately Invoked Function Expression) statt top-level await
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// https://github.com/typescript-eslint/typescript-eslint/issues/647
// https://github.com/typescript-eslint/typescript-eslint/pull/1799
(async () => {
    try {
        await shared_1.populateDB();
        await shared_1.connectDB();
        startServer();
    }
    catch (err) {
        shared_1.logger.error(`Fehler beim Start des Servers: ${json5_1.default.stringify(err)}`);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRzs7O0FBRUgsK0NBQStDO0FBRS9DLDJEQUEyRDtBQUMzRCx1Q0FBcUM7QUFFckMscUNBQXVFO0FBQ3ZFLDJCQUFtQztBQUVuQywwREFBMEI7QUFLMUIsK0JBQTRCO0FBQzVCLHVDQUFzQztBQUN0QyxpQ0FBcUM7QUFDckMsb0RBQW9CO0FBQ3BCLHdFQUF1QztBQUV2QyxvQ0FBb0M7QUFDcEMsaUJBQWlCO0FBQ2pCLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUN0QixxQkFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7QUFDaEcsQ0FBQyxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO0lBQ2xCLGVBQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUMvQyxZQUFZLEVBQUUsQ0FBQztJQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7QUFDaEUsQ0FBQyxDQUFDO0FBQ0YsbUNBQW1DO0FBRW5DLGdCQUFnQjtBQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxxQkFBWSxDQUFDO0FBQzNDLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUNyQix3Q0FBd0M7SUFDeEMsTUFBTSxNQUFNLEdBQUc7Ozs7Ozs7OztLQVNkLENBQUM7SUFFRixlQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqQyxzQ0FBc0M7SUFDdEMsZUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbEQsZUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsU0FBSSxFQUFFLElBQUksWUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELGVBQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkMsZUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsWUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvQyxlQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUNyQixlQUFNLENBQUMsSUFBSSxDQUNQLFdBQVcsSUFBSSxJQUFJLElBQUksOENBQThDLENBQ3hFLENBQUM7S0FDTDtTQUFNO1FBQ0gsZUFBTSxDQUFDLElBQUksQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0tBQ3pFO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO0lBQ3JCLElBQUksTUFBNEIsQ0FBQztJQUNqQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxxQkFBWSxDQUFDO1FBQ25DLHVCQUF1QjtRQUN2QixNQUFNLE9BQU8sR0FBeUI7WUFDbEMsR0FBRztZQUNILElBQUk7WUFDSixVQUFVLEVBQUUsU0FBUztTQUN4QixDQUFDO1FBQ0YsNEZBQTRGO1FBQzVGLE1BQU0sR0FBRyxvQkFBWSxDQUFDLE9BQU8sRUFBRSxTQUFzQixDQUFDLENBQUM7S0FDMUQ7U0FBTTtRQUNILE1BQU0sR0FBRyxTQUFHLENBQUM7S0FDaEI7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVqQyxnRUFBZ0U7SUFDaEUscURBQXFEO0lBQ3JELFVBQVU7SUFDVixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUvQix3QkFBd0I7SUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFdEMscURBQXFEO0lBQ3JELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNyQyxlQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYseUVBQXlFO0FBQ3pFLHlEQUF5RDtBQUN6RCxvRUFBb0U7QUFDcEUsbUVBQW1FO0FBQ25FLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDUixJQUFJO1FBQ0EsTUFBTSxtQkFBVSxFQUFFLENBQUM7UUFDbkIsTUFBTSxrQkFBUyxFQUFFLENBQUM7UUFDbEIsV0FBVyxFQUFFLENBQUM7S0FDakI7SUFBQyxPQUFPLEdBQVksRUFBRTtRQUNuQixlQUFNLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxRTtBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE2IC0gcHJlc2VudCBKdWVyZ2VuIFppbW1lcm1hbm4sIEhvY2hzY2h1bGUgS2FybHNydWhlXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vaTBuYXRhbi9ub2RlYmVzdHByYWN0aWNlc1xuXG4vLyBTdGFja3RyYWNlcyBtaXQgQmVydWVja3NpY2h0aWd1bmcgZGVyIFR5cGVTY3JpcHQtRGF0ZWllblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgeyBjb25uZWN0REIsIGxvZ2dlciwgcG9wdWxhdGVEQiwgc2VydmVyQ29uZmlnIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgcmVsZWFzZSwgdHlwZSB9IGZyb20gJ29zJztcbmltcG9ydCB0eXBlIHsgQXBwbGljYXRpb24gfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBKU09ONSBmcm9tICdqc29uNSc7XG4vLyBcInR5cGUtb25seSBpbXBvcnRcIiBhYiBUeXBlU2NyaXB0IDMuOFxuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0TGlzdGVuZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCB0eXBlIHsgU2VjdXJlQ29udGV4dE9wdGlvbnMgfSBmcm9tICd0bHMnO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXIgfSBmcm9tICduZXQnO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi9hcHAnO1xuaW1wb3J0IHsgY29ubmVjdGlvbiB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IGNyZWF0ZVNlcnZlciB9IGZyb20gJ2h0dHBzJztcbmltcG9ydCBpcCBmcm9tICdpcCc7XG5pbXBvcnQgc3RyaXBJbmRlbnQgZnJvbSAnc3RyaXAtaW5kZW50JztcblxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvY2Vzcy1leGl0ICovXG4vLyBBcnJvdyBGdW5jdGlvblxuY29uc3QgZGlzY29ubmVjdERCID0gKCkgPT4ge1xuICAgIGNvbm5lY3Rpb24uY2xvc2UoKS5jYXRjaCgoKSA9PiBwcm9jZXNzLmV4aXQoMCkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vZGUvbm8tcHJvY2Vzcy1leGl0XG59O1xuXG5jb25zdCBzaHV0ZG93biA9ICgpID0+IHtcbiAgICBsb2dnZXIuaW5mbygnU2VydmVyIHdpcmQgaGVydW50ZXJnZWZhaHJlbi4uLicpO1xuICAgIGRpc2Nvbm5lY3REQigpO1xuICAgIHByb2Nlc3MuZXhpdCgwKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBub2RlL25vLXByb2Nlc3MtZXhpdFxufTtcbi8qIGVzbGludC1lbmFibGUgbm8tcHJvY2Vzcy1leGl0ICovXG5cbi8vIERlc3RydWN0dXJpbmdcbmNvbnN0IHsgY2xvdWQsIGhvc3QsIHBvcnQgfSA9IHNlcnZlckNvbmZpZztcbmNvbnN0IHByaW50QmFubmVyID0gKCkgPT4ge1xuICAgIC8vIEhlcm9rdSBlbnRmZXJudCBmdWVocmVuZGUgTGVlcnplaWNoZW5cbiAgICBjb25zdCBiYW5uZXIgPSBgXG5cbiAgICAgICAgLiAgICAgICBfXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fX19fXG4gICAgICAgIC4gICAgICAvIC9fICBfX19fXyAgX19fX19fX19fIF9fX18gIF9fX18gICAgIC9fXyAgL1xuICAgICAgICAuIF9fICAvIC8gLyAvIC8gXyBcXFxcLyBfX18vIF9fIFxcYC8gXyBcXFxcLyBfXyBcXFxcICAgICAgLyAvXG4gICAgICAgIC4vIC9fLyAvIC9fLyAvICBfXy8gLyAgLyAvXy8gLyAgX18vIC8gLyAvICAgICAvIC9fX19cbiAgICAgICAgLlxcXFxfX19fL1xcXFxfXyxfL1xcXFxfX18vXy8gICBcXFxcX18sIC9cXFxcX19fL18vIC9fLyAgICAgL19fX18oXylcbiAgICAgICAgLiAgICAgICAgICAgICAgICAgICAgIC9fX19fL1xuXG4gICAgYDtcblxuICAgIGxvZ2dlci5pbmZvKHN0cmlwSW5kZW50KGJhbm5lcikpO1xuICAgIC8vIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sXG4gICAgbG9nZ2VyLmluZm8oYE5vZGU6ICAgICAgICAgICAke3Byb2Nlc3MudmVyc2lvbn1gKTtcbiAgICBsb2dnZXIuaW5mbyhgQmV0cmllYnNzeXN0ZW06ICR7dHlwZSgpfSAke3JlbGVhc2UoKX1gKTtcbiAgICBsb2dnZXIuaW5mbyhgUmVjaG5lcm5hbWU6ICAgICR7aG9zdH1gKTtcbiAgICBsb2dnZXIuaW5mbyhgSVAtQWRyZXNzZTogICAgICR7aXAuYWRkcmVzcygpfWApO1xuICAgIGxvZ2dlci5pbmZvKCcnKTtcbiAgICBpZiAoY2xvdWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICAgIGBodHRwczovLyR7aG9zdH06JHtwb3J0fSBpc3QgZ2VzdGFydGV0OiBIZXJ1bnRlcmZhaHJlbiBkdXJjaCA8U3RyZz5DYCxcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIuaW5mbygnRGVyIFNlcnZlciBpc3QgZ2VzdGFydGV0OiBIZXJ1bnRlcmZhaHJlbiBkdXJjaCA8U3RyZz5DJyk7XG4gICAgfVxufTtcblxuY29uc3Qgc3RhcnRTZXJ2ZXIgPSAoKSA9PiB7XG4gICAgbGV0IHNlcnZlcjogU2VydmVyIHwgQXBwbGljYXRpb247XG4gICAgaWYgKGNsb3VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgeyBjZXJ0LCBrZXkgfSA9IHNlcnZlckNvbmZpZztcbiAgICAgICAgLy8gU2hvcnRoYW5kIFByb3BlcnRpZXNcbiAgICAgICAgY29uc3Qgb3B0aW9uczogU2VjdXJlQ29udGV4dE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBjZXJ0LFxuICAgICAgICAgICAgbWluVmVyc2lvbjogJ1RMU3YxLjMnLFxuICAgICAgICB9O1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTc0NDk3NS9lbmFibGluZy1odHRwcy1vbi1leHByZXNzLWpzI2Fuc3dlci0xMTc0NTExNFxuICAgICAgICBzZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIob3B0aW9ucywgYXBwIGFzIFJlcXVlc3RMaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VydmVyID0gYXBwO1xuICAgIH1cbiAgICBzZXJ2ZXIubGlzdGVuKHBvcnQsIHByaW50QmFubmVyKTtcblxuICAgIC8vIHV0aWwucHJvbWlzaWZ5KGZuKSBmdW5rdGlvbmllcnQgbnVyIG1pdCBGdW5rdGlvbmVuLCBiZWkgZGVuZW5cbiAgICAvLyBkZXIgZXJyb3ItQ2FsbGJhY2sgZGFzIGVyc3RlIEZ1bmt0aW9uc2FyZ3VtZW50IGlzdFxuICAgIC8vIDxTdHJnPkNcbiAgICBwcm9jZXNzLm9uKCdTSUdJTlQnLCBzaHV0ZG93bik7XG5cbiAgICAvLyBub2RlbW9uIG51dHp0IFNJR1VTUjJcbiAgICBwcm9jZXNzLm9uY2UoJ1NJR1VTUjInLCBkaXNjb25uZWN0REIpO1xuXG4gICAgLy8gRmFsbHMgYmVpIGVpbmVtIFByb21pc2UgZGllIEZlaGxlcmJlaGFuZGx1bmcgZmVobHRcbiAgICBwcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAoZXJyKSA9PiB7XG4gICAgICAgIGxvZ2dlci5lcnJvcigndW5oYW5kbGVkIHJlamVjdGlvbicsIGVycik7XG4gICAgfSk7XG59O1xuXG4vLyBJSUZFICg9IEltbWVkaWF0ZWx5IEludm9rZWQgRnVuY3Rpb24gRXhwcmVzc2lvbikgc3RhdHQgdG9wLWxldmVsIGF3YWl0XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dsb3NzYXJ5L0lJRkVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90eXBlc2NyaXB0LWVzbGludC90eXBlc2NyaXB0LWVzbGludC9pc3N1ZXMvNjQ3XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHlwZXNjcmlwdC1lc2xpbnQvdHlwZXNjcmlwdC1lc2xpbnQvcHVsbC8xNzk5XG4oYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHBvcHVsYXRlREIoKTtcbiAgICAgICAgYXdhaXQgY29ubmVjdERCKCk7XG4gICAgICAgIHN0YXJ0U2VydmVyKCk7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgRmVobGVyIGJlaW0gU3RhcnQgZGVzIFNlcnZlcnM6ICR7SlNPTjUuc3RyaW5naWZ5KGVycil9YCk7XG4gICAgfVxufSkoKTtcbiJdfQ==
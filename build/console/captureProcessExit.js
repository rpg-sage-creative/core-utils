import { error } from "./loggers/error.js";
import { info } from "./loggers/info.js";
async function onSignal(eventName, code) {
    try {
        info(`process.on("${eventName}") = ${code}`);
        if (!signalHandlers?.size) {
            process.exit(code);
        }
        let exitCode = 0;
        const exitHandler = (err) => {
            error(err);
            exitCode = 1;
        };
        for (const handler of signalHandlers) {
            try {
                await Promise.resolve(handler(eventName, code)).catch(exitHandler);
            }
            catch (ex) {
                exitHandler(ex);
            }
        }
        process.exit(exitCode);
    }
    catch (outer) {
        error(outer);
        process.exit(1);
    }
}
let captured = false;
let signalHandlers;
export function captureProcessExit(signalHandler) {
    if (signalHandler) {
        if (!signalHandlers) {
            signalHandlers = new Set();
        }
        signalHandlers.add(signalHandler);
    }
    if (!captured) {
        process.on("SIGINT", onSignal);
        captured = true;
    }
}

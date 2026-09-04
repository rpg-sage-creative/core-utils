import { error } from "./loggers/error.js";
import { info } from "./loggers/info.js";
async function onSignal(eventName, code) {
    try {
        // log the event
        info(`process.on("${eventName}") = ${code}`);
        // if we don't have handlers, just exit
        if (!signalHandlers?.size && !destroyables) {
            process.exit(code);
        }
        // setup the exitCode
        let exitCode = 0;
        const exitHandler = (err) => {
            error(err);
            exitCode = 1;
        };
        // if we have destroyables, send the event
        if (destroyables) {
            for (const destroyable of destroyables) {
                try {
                    await Promise.resolve(destroyable.destroy()).catch(exitHandler);
                }
                catch (ex) {
                    exitHandler(ex);
                }
            }
            destroyables.clear();
            destroyables = undefined;
        }
        // if we have handlers, send the event
        if (signalHandlers) {
            for (const handler of signalHandlers) {
                try {
                    await Promise.resolve(handler(eventName, code)).catch(exitHandler);
                }
                catch (ex) {
                    exitHandler(ex);
                }
            }
            signalHandlers.clear();
            signalHandlers = undefined;
        }
        // send exit code
        process.exit(exitCode);
    }
    catch (outer) {
        error(outer);
        process.exit(1);
    }
}
let captured = false;
let destroyables;
let signalHandlers;
export function captureProcessExit(arg) {
    if (arg) {
        if (typeof (arg) === "function") {
            (signalHandlers ??= new Set()).add(arg);
        }
        else if (typeof (arg.destroy) === "function") {
            (destroyables ??= new Set()).add(arg);
        }
    }
    if (!captured) {
        process.on("SIGINT", onSignal);
        captured = true;
    }
}

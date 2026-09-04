import { colorPrefix } from "../colors/colorPrefix.js";
import { getHandlers } from "../handlers/getHandlers.js";
import { isLogLevelEnabled } from "../logLevels/isLogLevelEnabled.js";
/** The current logger. */
let _logger;
/** Returns the current logger. */
export function getLogger() {
    if (!_logger) {
        /** Single logging function to ensure we don't duplicate code deciding which environment logs what. */
        const log = (logLevel, ...args) => {
            if (!isLogLevelEnabled(logLevel)) {
                return;
            }
            // we only want logLevel:: if we have args; otherwise we want a blank line ...
            const outArgs = args.length ? [colorPrefix(logLevel)].concat(args) : [``];
            // send updated outArgs to the proper logger function
            if (logLevel === "error") {
                console.error(...outArgs);
            }
            else if (logLevel === "warn") {
                console.warn(...outArgs);
            }
            else {
                console.log(...outArgs);
            }
            // send the original args to any extra handlers
            getHandlers()?.get(logLevel)?.forEach(handler => handler(...args));
        };
        /** Create the default logger. */
        _logger = {
            silly: (...args) => log("silly", ...args),
            debug: (...args) => log("debug", ...args),
            verbose: (...args) => log("verbose", ...args),
            http: (...args) => log("http", ...args),
            info: (...args) => log("info", ...args),
            warn: (...args) => log("warn", ...args),
            error: (...args) => log("error", ...args)
        };
    }
    return _logger;
}

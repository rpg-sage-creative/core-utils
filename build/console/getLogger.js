import { colorPrefix } from "./colors/colorPrefix.js";
import { getHandlers } from "./handlers/getHandlers.js";
import { isLogLevelEnabled } from "./logLevels/isLogLevelEnabled.js";
let _logger;
export function getLogger() {
    if (!_logger) {
        const log = (logLevel, ...args) => {
            if (!isLogLevelEnabled(logLevel)) {
                return;
            }
            const outArgs = args.length ? [colorPrefix(logLevel)].concat(args) : [``];
            if (logLevel === "error") {
                console.error(...outArgs);
            }
            else if (logLevel === "warn") {
                console.warn(...outArgs);
            }
            else {
                console.log(...outArgs);
            }
            getHandlers()?.get(logLevel)?.forEach(handler => handler(...args));
        };
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

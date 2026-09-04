import { getLogLevels } from "./getLogLevels.js";
/** Disables the given log level from actually writing to logging. */
export function disableLogLevel(...logLevels) {
    const _logLevels = getLogLevels();
    if (_logLevels?.size) {
        logLevels.forEach(logLevel => _logLevels.delete(logLevel));
    }
}

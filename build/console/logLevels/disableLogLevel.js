import { getLogLevels } from "./getLogLevels.js";
export function disableLogLevel(...logLevels) {
    const _logLevels = getLogLevels();
    if (_logLevels?.size) {
        logLevels.forEach(logLevel => _logLevels.delete(logLevel));
    }
}

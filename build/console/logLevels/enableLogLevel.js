import { getLogLevels } from "./getLogLevels.js";
/**
 * Enables the given log level to actually write to logging.
 */
export function enableLogLevel(...logLevels) {
    const _logLevels = getLogLevels(true);
    logLevels.forEach(logLevel => _logLevels.add(logLevel));
}

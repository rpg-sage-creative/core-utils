import { getLogLevels } from "./getLogLevels.js";
export function enableLogLevel(...logLevels) {
    const _logLevels = getLogLevels(true);
    logLevels.forEach(logLevel => _logLevels.add(logLevel));
}

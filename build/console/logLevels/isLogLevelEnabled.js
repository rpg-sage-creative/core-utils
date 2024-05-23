import { getLogLevels } from "./getLogLevels.js";
export function isLogLevelEnabled(logLevel) {
    return getLogLevels()?.has(logLevel) === true;
}

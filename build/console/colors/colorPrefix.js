import {} from "../logLevels/LogLevel.js";
import { isColorLevelEnabled } from "./isColorLevelEnabled.js";
function getColorCode(logLevel) {
    if (isColorLevelEnabled(logLevel)) {
        switch (logLevel) {
            case "error": return 31;
            case "warn": return 33;
            default: return undefined;
        }
    }
    return undefined;
}
export function colorPrefix(logLevel) {
    const colorCode = getColorCode(logLevel);
    if (colorCode !== undefined) {
        return `\x1b[${colorCode}m${logLevel}::\x1b[0m`;
    }
    return logLevel + "::";
}

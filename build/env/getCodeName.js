import { enableLogLevels } from "../console/logLevels/enableLogLevels.js";
import { codeNameToEnvironmentName } from "./internal/codeNameToEnvironmentName.js";
import { getFromProcess } from "./internal/getFromProcess.js";
function isValidCodeName(value) {
    return ["dev", "beta", "stable"].includes(value);
}
function isValid(value) {
    return typeof (value) === "string" ? isValidCodeName(value) : false;
}
function enableLogLevelsIfValid(value) {
    const stringValue = String(value);
    if (isValidCodeName(stringValue)) {
        enableLogLevels(codeNameToEnvironmentName(stringValue));
        return true;
    }
    return false;
}
let _codeName;
export function getCodeName(registerLogLevels) {
    if (!_codeName) {
        const test = registerLogLevels ? enableLogLevelsIfValid : isValid;
        _codeName = getFromProcess(test, "codeName", "NODE_ENV");
    }
    return _codeName;
}

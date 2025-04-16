import { enableLogLevels } from "../console/logLevels/enableLogLevels.js";
import { getFromProcess } from "./getFromProcess.js";
import { codeNameToEnvironmentName } from "./internal/codeNameToEnvironmentName.js";
let _codeName;
export function getCodeName(registerLogLevels) {
    if (!_codeName) {
        const codeNameValidator = (value) => {
            return ["dev", "beta", "stable"].includes(String(value));
        };
        if (registerLogLevels) {
            const enableLogLevelsIfValid = (value) => {
                if (codeNameValidator(value)) {
                    enableLogLevels(codeNameToEnvironmentName(value));
                    return true;
                }
                return false;
            };
            _codeName = getFromProcess(enableLogLevelsIfValid, "codeName", "NODE_ENV");
        }
        else {
            _codeName = getFromProcess(codeNameValidator, "codeName", "NODE_ENV");
        }
    }
    return _codeName;
}

import { getCodeName } from "./getCodeName.js";
import { codeNameToEnvironmentName } from "./internal/codeNameToEnvironmentName.js";
let _environmentName;
/**
 * Derives the environment name from the code name.
 */
export function getEnvironmentName() {
    if (!_environmentName) {
        _environmentName = codeNameToEnvironmentName(getCodeName());
    }
    return _environmentName;
}

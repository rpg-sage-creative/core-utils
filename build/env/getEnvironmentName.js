import { getCodeName } from "./getCodeName.js";
import { codeNameToEnvironmentName } from "./internal/codeNameToEnvironmentName.js";
let _environmentName;
export function getEnvironmentName() {
    if (!_environmentName) {
        _environmentName = codeNameToEnvironmentName(getCodeName());
    }
    return _environmentName;
}

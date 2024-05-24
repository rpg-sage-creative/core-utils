import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { getFromProcess } from "./internal/getFromProcess.js";
function isValid(value) {
    return isNonNilSnowflake(String(value));
}
const _ids = {};
export function getId(name) {
    if (!_ids[name]) {
        _ids[name] = getFromProcess(isValid, `${name}Id`);
    }
    return _ids[name];
}

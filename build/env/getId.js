import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { isString } from "../types/index.js";
import { getFromProcess } from "./getFromProcess.js";
const _ids = {};
export function getId(name) {
    if (!_ids[name]) {
        const snowflakeValidator = (value) => {
            return isString(value) && isNonNilSnowflake(value);
        };
        _ids[name] = getFromProcess(snowflakeValidator, `${name}Id`);
    }
    return _ids[name];
}

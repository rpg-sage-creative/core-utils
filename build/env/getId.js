import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { getFromProcess } from "./getFromProcess.js";
const _ids = {};
export function getId(name) {
    if (!_ids[name]) {
        const snowflakeValidator = (value) => {
            return isNonNilSnowflake(String(value));
        };
        _ids[name] = getFromProcess(snowflakeValidator, `${name}Id`);
    }
    return _ids[name];
}

import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { getFromProcess } from "./getFromProcess.js";
const _ids = {};
export function getIds(name) {
    if (!_ids[name]) {
        const snowflakesValidator = (value) => {
            if (typeof (value) === "string")
                return value.split(",").every(isNonNilSnowflake);
            if (Array.isArray(value))
                return value.every(isNonNilSnowflake);
            return false;
        };
        const raw = getFromProcess(snowflakesValidator, `${name}Ids`);
        _ids[name] = Array.isArray(raw) ? raw : raw.split(",");
    }
    return _ids[name];
}

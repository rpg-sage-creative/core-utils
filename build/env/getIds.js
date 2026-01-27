import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { getFromProcess } from "./getFromProcess.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
const _ids = {};
export function getIds(name, ignoreMissing) {
    if (!_ids[name]) {
        const snowflakesValidator = (value) => {
            if (typeof (value) === "string")
                return value.split(",").every(isNonNilSnowflake);
            if (Array.isArray(value))
                return value.every(isNonNilSnowflake);
            return false;
        };
        const getter = ignoreMissing ? getFromProcessSafely : getFromProcess;
        const raw = getter(snowflakesValidator, `${name}Ids`);
        _ids[name] = Array.isArray(raw) ? raw : raw?.split(",") ?? [];
    }
    return _ids[name];
}

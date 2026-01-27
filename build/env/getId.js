import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import { getFromProcess } from "./getFromProcess.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
const _ids = {};
export function getId(name, ignoreMissing) {
    if (!(name in _ids)) {
        const snowflakeValidator = (value) => {
            return typeof (value) === "string" && isNonNilSnowflake(value);
        };
        const getter = ignoreMissing ? getFromProcessSafely : getFromProcess;
        _ids[name] = getter(snowflakeValidator, `${name}Id`) ?? null;
    }
    return _ids[name] ?? undefined;
}

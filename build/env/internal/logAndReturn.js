import { verbose } from "../../console/loggers/verbose.js";
import { stringify } from "../../json/bigint/stringify.js";
export function logAndReturn(key, value) {
    verbose(`Environment Variable: ${key}=${stringify(value)}`);
    return value;
}

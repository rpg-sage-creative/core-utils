import { verbose } from "../../console/loggers/verbose.js";
import { stringifyJson } from "../../json/stringifyJson.js";
export function logAndReturn(key, value) {
    verbose(`Environment Variable: ${key}=${stringifyJson(value)}`);
    return value;
}

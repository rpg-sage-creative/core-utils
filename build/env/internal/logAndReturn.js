import { verbose } from "../../console/loggers/verbose.js";
import { stringifyJson } from "../../json/stringifyJson.js";
export function logAndReturn(from, key, value) {
    const outValue = key.endsWith("Token") ? value.split("").map(() => "*").join("") : value;
    verbose(`Environment Variable (${from}): ${key}=${stringifyJson(outValue)}`);
    return value;
}

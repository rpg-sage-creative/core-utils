import { verbose } from "../../console/loggers/verbose.js";
import { stringifyJson } from "../../json/stringifyJson.js";
export function logAndReturn(from, key, value) {
    const shouldMask = key.endsWith("Token") || key.includes("AccessKey");
    const outValue = shouldMask ? value.split("").map(() => "*").join("") : value;
    verbose(`Environment Variable (${from}): ${key}=${stringifyJson(outValue)}`);
    return value;
}

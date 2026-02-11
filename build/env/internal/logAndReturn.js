import { stringifyJson } from "@rsc-utils/json-utils";
import { verbose } from "../../console/loggers/verbose.js";
export function logAndReturn(from, key, value) {
    const shouldMask = key.endsWith("Token") || key.includes("AccessKey");
    const outValue = shouldMask ? value.split("").map(() => "*").join("") : value;
    verbose(`Environment Variable (${from}): ${key}=${stringifyJson(outValue)}`);
    return value;
}

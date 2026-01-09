import { stringifyJson } from "@rpg-sage-creative/json-utils";
import { verbose } from "../../console/loggers/verbose.js";
export function logAndReturn(from, key, value) {
    const outValue = key.endsWith("Token") ? value.split("").map(() => "*").join("") : value;
    verbose(`Environment Variable (${from}): ${key}=${stringifyJson(outValue)}`);
    return value;
}

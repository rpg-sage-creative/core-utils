import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import {} from "./KeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
export function parseKeyValueArgs(input) {
    return (input?.match(getKeyValueArgRegex()) ?? [])
        .map(match => parseKeyValueArg(match))
        .filter(arg => arg);
}

import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import {} from "./KeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";
export function parseKeyValueArgs(input, options) {
    const regexp = getKeyValueArgRegex({ ...options, gFlag: "g" });
    const matches = input?.match(regexp) ?? [];
    const args = matches.map(match => parseKeyValueArg(match));
    return args.filter(arg => arg);
}

import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import { parseValidKeyValueArg } from "./internal/parseValidKeyValueArg.js";
export function parseKeyValueArgs(input, options) {
    const regexp = getKeyValueArgRegex({ ...options, gFlag: "g" });
    const matches = input?.match(regexp) ?? [];
    const args = matches.map(parseValidKeyValueArg);
    return args.filter(arg => arg);
}

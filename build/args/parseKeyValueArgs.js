import { globalizeRegex } from "../regex/globalizeRegex.js";
import { KeyValueArgRegExp, parseKeyValueArg } from "./parseKeyValueArg.js";
export const KeyValueArgRegExpG = globalizeRegex(KeyValueArgRegExp);
export function parseKeyValueArgs(input) {
    if (!input)
        return [];
    const matches = input.match(KeyValueArgRegExpG) ?? [];
    const args = matches.map(arg => parseKeyValueArg(arg));
    return args.filter(arg => arg);
}

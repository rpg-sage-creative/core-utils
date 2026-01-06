import { KeyValueArgRegExp, parseKeyValueArg } from "./parseKeyValueArg.js";
export const KeyValueArgRegExpG = new RegExp(KeyValueArgRegExp, "g");
export function parseKeyValueArgs(input) {
    if (!input)
        return [];
    const matches = input.match(KeyValueArgRegExpG) ?? [];
    const args = matches.map(arg => parseKeyValueArg(arg));
    return args.filter(arg => arg);
}

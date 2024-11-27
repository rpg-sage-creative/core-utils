import { dequote, isEmptyQuotes, quote } from "../string/index.js";
import {} from "./KeyValueArg.js";
import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
export function parseKeyValueArg(input, options) {
    const key = typeof (options) === "string" ? options : options?.key;
    const mode = typeof (options) === "string" ? undefined : options?.mode;
    const regexp = getKeyValueArgRegex({ anchored: true, capture: "arg", key, mode });
    const groups = regexp.exec(input)?.groups;
    if (groups) {
        const { argKey, argQuotedValue, argNakedValue } = groups;
        if (argQuotedValue) {
            const value = isEmptyQuotes(argQuotedValue) ? "" : dequote(argQuotedValue);
            return {
                key: argKey,
                keyLower: argKey.toLowerCase(),
                value,
                clean: `${argKey}=${quote(value)}`,
            };
        }
        return {
            key: argKey,
            keyLower: argKey.toLowerCase(),
            value: argNakedValue,
            clean: `${argKey}=${quote(argNakedValue)}`,
        };
    }
    return null;
}

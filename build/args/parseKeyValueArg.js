import { dequote, quote } from "../string/index.js";
import {} from "./KeyValueArg.js";
import {} from "./getKeyValueArgRegex.js";
import { isKeyValueArg } from "./isKeyValueArg.js";
export function parseKeyValueArg(input, options) {
    if (isKeyValueArg(input, options)) {
        const index = input.indexOf("=");
        const key = input.slice(0, index).trim();
        const keyLower = key.toLowerCase();
        const trimmed = input.slice(index + 1).trim();
        const value = dequote(trimmed, { quantifier: "*" });
        const quoted = quote(value);
        const clean = `${keyLower}=${quoted}`;
        return { key, keyLower, value, clean };
    }
    return null;
}

import { dequote, quote } from "../string/index.js";
import {} from "./KeyValueArg.js";
import { isKeyValueArg } from "./isKeyValueArg.js";
export function parseKeyValueArg(input, key) {
    if (isKeyValueArg(input, { key })) {
        const index = input.indexOf("=");
        const key = input.slice(0, index).trim();
        const keyLower = key.toLowerCase();
        const value = dequote(input.slice(index + 1).trim());
        const quoted = quote(value);
        const clean = `${keyLower}=${quoted}`;
        return { key, keyLower, value, clean };
    }
    return null;
}

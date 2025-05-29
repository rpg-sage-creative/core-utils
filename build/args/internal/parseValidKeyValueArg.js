import { dequote } from "../../string/quotes/dequote.js";
export function parseValidKeyValueArg(arg) {
    const index = arg.indexOf("=");
    const key = arg.slice(0, index).trim();
    const keyLower = key.toLowerCase();
    const trimmed = arg.slice(index + 1).trim();
    const value = dequote(trimmed, { contents: "*" });
    return { arg, index: -1, isKeyValue: true, key, keyLower, value };
}

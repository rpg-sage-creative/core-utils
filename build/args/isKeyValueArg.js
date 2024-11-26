import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
export function isKeyValueArg(value, options) {
    return getKeyValueArgRegex({ anchored: true, ...options }).test(value);
}

import { getQuotedRegex } from "./getQuotedRegex.js";
export function isQuoted(value, options) {
    return value ? getQuotedRegex({ anchored: true, ...options }).test(value) : false;
}

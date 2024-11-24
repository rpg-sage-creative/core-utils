import { getQuotedRegex } from "./getQuotedRegex.js";
export function isQuoted(value, style) {
    return value ? getQuotedRegex({ anchored: true, style }).test(value) : false;
}

import { getQuotedRegex } from "../../regex/getQuotedRegex.js";
export function isQuoted(value, style) {
    const regex = getQuotedRegex({ anchored: true, style });
    return value ? regex.test(value) : false;
}

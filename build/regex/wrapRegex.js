import { splitChars } from "../string/wrap/splitChars.js";
import { escapeRegex } from "./escapeRegex.js";
export function wrapRegex(regexp, chars, required) {
    const { left, right } = splitChars(chars);
    const lPattern = escapeRegex(left);
    const rPattern = escapeRegex(right);
    return required === "optional"
        ? new RegExp(`(?:${lPattern}(?:${regexp.source})${rPattern})|(?:${regexp.source})`, regexp.flags)
        : new RegExp(`${lPattern}(?:${regexp.source})${rPattern}`, regexp.flags);
}

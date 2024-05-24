import { stringify } from "./bigint/stringify.js";
function cleanWhitespaceIfShort(value, maxLineLength) {
    return value.length > maxLineLength
        ? value
        : value.replace(/\s+/g, " ");
}
function inlineCurlyBraces(value, maxLineLength) {
    return value.replace(/\{[^{]*?\}/g, match => cleanWhitespaceIfShort(match, maxLineLength));
}
function inlineSquareBrackets(value, maxLineLength) {
    return value.replace(/\[[\w",\s-.]*?\]/g, match => cleanWhitespaceIfShort(match, maxLineLength));
}
export function formattedStringify(object, maxLineLength = 250) {
    if (object === null || object === undefined) {
        return String(object);
    }
    const stringified = stringify(object, null, "\t");
    return inlineCurlyBraces(inlineSquareBrackets(stringified, maxLineLength), maxLineLength);
}

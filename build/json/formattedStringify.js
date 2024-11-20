import { isNullOrUndefined } from "../types/index.js";
import { stringifyJson } from "./stringifyJson.js";
function cleanWhitespaceIfShort(value, maxLineLength) {
    return value.length > maxLineLength ? value : value.replace(/\s+/g, " ");
}
function inlineCurlyBraces(value, maxLineLength) {
    return value.replace(/\{[^{[]*?\}/g, match => cleanWhitespaceIfShort(match, maxLineLength));
}
function inlineSquareBrackets(value, maxLineLength) {
    return value.replace(/\[((,\s*)?)("[^"]*"|[\w",\s-.])*?\]/g, match => cleanWhitespaceIfShort(match, maxLineLength));
}
export function formattedStringify(object, options = {}) {
    if (isNullOrUndefined(object)) {
        return String(object);
    }
    const tab = options?.insertSpaces ? "".padEnd(options.tabSize ?? 4, " ") : "\t";
    const stringified = stringifyJson(object, null, tab);
    const { maxLineLength = 250 } = options;
    return inlineCurlyBraces(inlineSquareBrackets(stringified, maxLineLength), maxLineLength);
}

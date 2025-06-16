import { isDate } from "util/types";
export function stringifyJson(value, replacer, space, maxLineLength = 0) {
    if (maxLineLength > 0 && !space)
        space = "\t";
    const stringified = JSON.stringify(value, function (key, value) {
        const cleanValue = this[key];
        if (isDate(cleanValue))
            return { $date: cleanValue.toISOString() };
        if (typeof (cleanValue) === "bigint")
            return { $bigint: cleanValue.toString() };
        if (replacer) {
            if (typeof (replacer) === "function") {
                return replacer.call(this, key, value);
            }
            else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
                return undefined;
            }
        }
        return value;
    }, space);
    if (maxLineLength > 0) {
        const cleanWhitespaceIfShort = (value, maxLineLength) => value.length > maxLineLength ? value : value.replace(/\s+/g, " ");
        const inlineCurlyBraces = (value, maxLineLength) => value.replace(/\{[^{[]*?\}/g, match => cleanWhitespaceIfShort(match, maxLineLength));
        const inlineSquareBrackets = (value, maxLineLength) => value.replace(/\[((,\s*)?)("[^"]*"|[\w",\s-.])*?\]/g, match => cleanWhitespaceIfShort(match, maxLineLength));
        return inlineCurlyBraces(inlineSquareBrackets(stringified, maxLineLength), maxLineLength);
    }
    return stringified;
}
export const stringify = stringifyJson;

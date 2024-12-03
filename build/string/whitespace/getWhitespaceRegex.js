import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
export const WHITESPACE_REGEX_SOURCE = `\\s`;
export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;
function createWhitespaceRegex(options) {
    const { gFlag = "", horizontalOnly, iFlag = "" } = options ?? {};
    const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;
    const flags = gFlag + iFlag;
    return new RegExp(whitespace, flags);
}
export function getWhitespaceRegex(options) {
    return getOrCreateRegex(createWhitespaceRegex, { quantifier: "+", ...options });
}

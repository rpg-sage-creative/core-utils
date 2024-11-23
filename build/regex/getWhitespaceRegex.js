import { regex } from "regex";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import { quantifyRegex } from "./quantifyRegex.js";
export const WHITESPACE_REGEX_SOURCE = `\\s`;
export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;
function createWhitespaceRegex(options) {
    const { capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};
    const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;
    const whitespaceRegex = new RegExp(whitespace, iFlag);
    const quantifiedRegex = quantifier
        ? quantifyRegex(whitespaceRegex, quantifier)
        : whitespaceRegex;
    const capturedRegex = capture
        ? captureRegex(quantifiedRegex, capture)
        : quantifiedRegex;
    return regex(gFlag + iFlag) `${capturedRegex}`;
}
export function getWhitespaceRegex(options) {
    return getOrCreateRegex(createWhitespaceRegex, options);
}

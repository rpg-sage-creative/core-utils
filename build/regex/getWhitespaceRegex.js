import { regex } from "regex";
import { HORIZONTAL_WHITESPACE_REGEX } from "../string/consts.js";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import { quantifyRegex } from "./quantifyRegex.js";
function createWhitespaceRegex(options) {
    const { capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};
    const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX : "\\s";
    const whitespaceRegex = regex(iFlag) `${whitespace}`;
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

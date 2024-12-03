import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
export const WHITESPACE_REGEX_SOURCE = `\\s`;
export const HORIZONTAL_WHITESPACE_REGEX_SOURCE = `[^\\S\\r\\n]`;
function createWhitespaceRegex(options) {
    const { anchored, capture, gFlag = "", horizontalOnly, iFlag = "", quantifier = "+" } = options ?? {};
    const whitespace = horizontalOnly ? HORIZONTAL_WHITESPACE_REGEX_SOURCE : WHITESPACE_REGEX_SOURCE;
    const flags = gFlag + iFlag;
    const whitespaceRegex = new RegExp(whitespace, flags);
    const quantifiedRegex = quantifier
        ? new RegExp(`(?:${whitespaceRegex.source})${quantifier}`, flags)
        : whitespaceRegex;
    const capturedRegex = capture
        ? captureRegex(quantifiedRegex, capture)
        : quantifiedRegex;
    const anchoredRegex = anchored
        ? new RegExp(`^(?:${capturedRegex.source})$`, flags)
        : capturedRegex;
    return anchoredRegex;
}
export function getWhitespaceRegex(options) {
    return getOrCreateRegex(createWhitespaceRegex, options);
}

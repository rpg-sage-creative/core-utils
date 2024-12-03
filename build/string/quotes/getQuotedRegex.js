import { rewrite } from "regex";
import { anchorRegex } from "../../regex/anchorRegex.js";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/internal/getOrCreateRegex.js";
import { getQuotePairs } from "./getQuotePairs.js";
export function createQuotedRegexPart([left, right], quantifier) {
    return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}
function createQuotedRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};
    const leftChars = [];
    const rightChars = [];
    const parts = [];
    getQuotePairs(style).forEach(pair => {
        leftChars.push(pair.chars[0]);
        rightChars.push(pair.chars[1]);
        parts.push(createQuotedRegexPart(pair.chars, quantifier));
    });
    const quotedRegex = new RegExp(`(?<!\\\\)(?:${parts.join("|")})`);
    const capturedRegex = capture
        ? captureRegex(quotedRegex, capture)
        : quotedRegex;
    const anchoredRegex = anchored
        ? anchorRegex(capturedRegex)
        : capturedRegex;
    const { expression, flags } = rewrite(anchoredRegex.source, { flags: gFlag + iFlag });
    const regexp = new RegExp(expression, flags);
    regexp.leftChars = leftChars.join("");
    regexp.rightChars = rightChars.join("");
    return regexp;
}
export function getQuotedRegex(options) {
    return getOrCreateRegex(createQuotedRegex, options);
}

import { getOrCreateRegex } from "../../regex/getOrCreateRegex.js";
import { getQuotePairs } from "./getQuotePairs.js";
export function createQuotedRegexPart([left, right], quantifier) {
    return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}
function createQuotedRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};
    const flags = gFlag + iFlag;
    const leftChars = [];
    const rightChars = [];
    const parts = [];
    getQuotePairs(style).forEach(pair => {
        leftChars.push(pair.chars[0]);
        rightChars.push(pair.chars[1]);
        parts.push(createQuotedRegexPart(pair.chars, quantifier));
    });
    const quotedRegex = new RegExp(`(?<!\\\\)(?:${parts.join("|")})`, flags);
    const capturedRegex = capture
        ? new RegExp(`(?<${capture}>${quotedRegex.source})`, flags)
        : quotedRegex;
    const anchoredRegex = anchored
        ? new RegExp(`^(?:${capturedRegex.source})$`, flags)
        : capturedRegex;
    const regexp = anchoredRegex;
    regexp.leftChars = leftChars.join("");
    regexp.rightChars = rightChars.join("");
    return regexp;
}
export function getQuotedRegex(options) {
    return getOrCreateRegex(createQuotedRegex, options);
}

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
    const parts = [];
    getQuotePairs().forEach(pair => {
        const addSingle = pair.isSingle && !style.includes("double");
        const addDouble = pair.isDouble && !style.includes("single");
        if (addSingle || addDouble) {
            if (!pair.isFancy && !pair.isExtended) {
                parts.push(createQuotedRegexPart(pair.chars, quantifier));
            }
            if (!style.includes("strict")) {
                if (pair.isFancy) {
                    parts.push(createQuotedRegexPart(pair.chars, quantifier));
                }
                if (!style.includes("fancy")) {
                    if (pair.isExtended) {
                        parts.push(createQuotedRegexPart(pair.chars, quantifier));
                    }
                }
            }
        }
    });
    const quotedRegex = new RegExp(parts.join("|"));
    const capturedRegex = capture
        ? captureRegex(quotedRegex, capture)
        : quotedRegex;
    const anchoredRegex = anchored
        ? anchorRegex(capturedRegex)
        : capturedRegex;
    const { expression, flags } = rewrite(anchoredRegex.source, { flags: gFlag + iFlag });
    return new RegExp(expression, flags);
}
export function getQuotedRegex(options) {
    return getOrCreateRegex(createQuotedRegex, options);
}

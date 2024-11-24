import { rewrite } from "regex";
import { anchorRegex } from "../../regex/anchorRegex.js";
import { captureRegex } from "../../regex/captureRegex.js";
import { getOrCreateRegex } from "../../regex/internal/getOrCreateRegex.js";
export function createQuotedRegexPart([left, right], quantifier) {
    return `${left}(?:[^${right}\\\\]|\\\\.)${quantifier}${right}`;
}
function createQuotedRegex(options) {
    const { anchored, capture, gFlag = "", iFlag = "", quantifier = "+", style = "any" } = options ?? {};
    const parts = [];
    if (!style.includes("double")) {
        parts.push(createQuotedRegexPart(`''`, quantifier));
        if (!style.includes("strict")) {
            parts.push(createQuotedRegexPart(`‘’`, quantifier));
        }
    }
    if (!style.includes("single")) {
        parts.push(createQuotedRegexPart(`""`, quantifier));
        if (!style.includes("strict")) {
            parts.push(createQuotedRegexPart(`“”`, quantifier));
            if (!style.includes("fancy")) {
                parts.push(createQuotedRegexPart(`„“`, quantifier));
                parts.push(createQuotedRegexPart(`„”`, quantifier));
            }
        }
    }
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

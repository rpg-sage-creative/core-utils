import { pattern, regex, rewrite } from "regex";
import { captureRegex } from "../regex/captureRegex.js";
import { getOrCreateRegex } from "../regex/getOrCreateRegex.js";
function createWordCharacterRegex(options) {
    const { allowDashes, allowPeriods, anchored, capture, gFlag = "", iFlag = "", quantifier = "" } = options ?? {};
    const dash = allowDashes ? "\\-" : "";
    const period = allowPeriods ? "\\." : "";
    const wordCharacterRegex = regex `[\w\p{L}\p{N}${pattern(dash)}${pattern(period)}]`;
    const quantifiedRegex = quantifier
        ? new RegExp(`(?:${wordCharacterRegex.source})${quantifier}`, wordCharacterRegex.flags)
        : wordCharacterRegex;
    const capturedRegex = capture
        ? captureRegex(quantifiedRegex, capture)
        : quantifiedRegex;
    const anchoredRegex = anchored
        ? new RegExp(`^(?:${capturedRegex.source})$`, capturedRegex.flags)
        : capturedRegex;
    const { expression, flags } = rewrite(anchoredRegex.source, { flags: gFlag + iFlag });
    return new RegExp(expression, flags);
}
export function getWordCharacterRegex(options) {
    return getOrCreateRegex(createWordCharacterRegex, options);
}

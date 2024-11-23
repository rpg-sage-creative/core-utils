import { pattern, regex, rewrite } from "regex";
import { captureRegex } from "./captureRegex.js";
import { getOrCreateRegex } from "./internal/getOrCreateRegex.js";
import { quantifyRegex } from "./quantifyRegex.js";
function createWordCharacterRegex(options) {
    const { capture, gFlag = "", iFlag = "", quantifier = "" } = options ?? {};
    const dash = options?.allowDashes ? "\\-" : "";
    const period = options?.allowPeriods ? "\\." : "";
    const wordCharacterRegex = regex `[\w\p{L}\p{N}${pattern(dash)}${pattern(period)}]`;
    const quantifiedRegex = quantifier
        ? quantifyRegex(wordCharacterRegex, quantifier)
        : wordCharacterRegex;
    const capturedRegex = capture
        ? captureRegex(quantifiedRegex, capture)
        : quantifiedRegex;
    const { expression, flags } = rewrite(capturedRegex.source, { flags: gFlag + iFlag });
    return new RegExp(expression, flags);
}
export function getWordCharacterRegex(options) {
    return getOrCreateRegex(createWordCharacterRegex, options);
}

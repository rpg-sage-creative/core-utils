import { splitWrapChars } from "../string/wrap/splitWrapChars.js";
import { escapeRegex } from "./escapeRegex.js";
export function wrapRegex(regexp, pairs, options) {
    if (!pairs.length) {
        return regexp;
    }
    const { flags } = regexp;
    const or = options?.or;
    for (const pair of pairs) {
        const { left, right } = splitWrapChars(pair);
        const original = regexp.source;
        let source = escapeRegex(left)
            + "\\s*(?:"
            + original
            + ")\\s*"
            + escapeRegex(right);
        if (or) {
            source +=
                "|(?:"
                    + original
                    + ")";
        }
        regexp = new RegExp(source, flags);
    }
    return regexp;
}

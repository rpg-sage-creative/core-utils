import { MisquotedContentRegExp } from "./MisquotedContentRegExp.js";
import { QuotedContentRegExp } from "./QuotedContentRegExp.js";
export function isQuotedOrMisquoted(value) {
    if (!value)
        return false;
    const quotedMatch = QuotedContentRegExp.exec(value);
    if (quotedMatch?.index === 0 && quotedMatch[0].length === value.length) {
        return "quoted";
    }
    const misquotedMatch = MisquotedContentRegExp.exec(value);
    if (misquotedMatch?.index === 0 && misquotedMatch[0].length === value.length) {
        return "misquoted";
    }
    return false;
}

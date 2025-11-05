import { QuotedContentRegExp } from "./QuotedContentRegExp.js";
export function isQuoted(value) {
    if (!value)
        return false;
    const match = QuotedContentRegExp.exec(value);
    return match?.index === 0 && match[0].length === value.length;
}

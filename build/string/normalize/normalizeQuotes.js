const QuotesRegExp = /[\u201C\u201D]/g;
/** Converts forward/back quote characters to " */
export function normalizeQuotes(text) {
    return text.replace(QuotesRegExp, `"`);
}

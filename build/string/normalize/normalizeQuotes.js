const QuotesRegExp = /[\u201C\u201D]/g;
export function normalizeQuotes(text) {
    return text.replace(QuotesRegExp, `"`);
}

export function normalizeQuotes(text) {
    return text.replace(/[\u201C\u201D]/g, `"`);
}

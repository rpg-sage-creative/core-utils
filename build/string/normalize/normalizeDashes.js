export function normalizeDashes(text) {
    return text.replace(/[\u2013\u2014]/g, `-`);
}

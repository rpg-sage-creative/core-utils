export function normalizeApostrophes(text) {
    return text.replace(/[\u2018\u2019]/g, `'`);
}

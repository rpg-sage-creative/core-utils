const ApostrophesRegExp = /[\u2018\u2019]/g;
export function normalizeApostrophes(text) {
    return text.replace(ApostrophesRegExp, `'`);
}

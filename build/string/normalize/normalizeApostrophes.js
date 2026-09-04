const ApostrophesRegExp = /[\u2018\u2019]/g;
/** Converts forward/back apostrophe characters to ' */
export function normalizeApostrophes(text) {
    return text.replace(ApostrophesRegExp, `'`);
}

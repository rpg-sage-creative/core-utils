const AccentsRegExp = /[\u0300-\u036f]/g;
/**
 * Removes accents from letters and normalizes other special/double characters.
 * Ex: "à" becomes "a" and "ﬀ" becomes "ff"
 */
export function removeAccents(value) {
    return value.normalize('NFKD').replace(AccentsRegExp, '');
}

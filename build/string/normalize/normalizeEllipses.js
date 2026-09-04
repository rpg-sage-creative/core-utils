const EllipsesRegExp = /…/g;
/** Converts ellipses character to ... */
export function normalizeEllipses(text) {
    return text.replace(EllipsesRegExp, `...`);
}

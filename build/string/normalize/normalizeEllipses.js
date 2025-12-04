const EllipsesRegExp = /…/g;
export function normalizeEllipses(text) {
    return text.replace(EllipsesRegExp, `...`);
}

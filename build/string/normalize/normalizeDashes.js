const DashesRegExp = /[\u2013\u2014]/g;
export function normalizeDashes(text) {
    return text.replace(DashesRegExp, `-`);
}

export const NumberStringRegExp = /[\-\+]?\d+(?:\.\d+)?/;
export function isNumberString(value) {
    if (!value)
        return false;
    const match = NumberStringRegExp.exec(value);
    return match?.index === 0 && match[0].length === value.length;
}

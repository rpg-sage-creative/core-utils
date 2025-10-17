export const NumberRegExp = /[\-\+]?\d+(?:\.\d+)?/;
export function isNumberString(value) {
    if (!value)
        return false;
    const match = NumberRegExp.exec(value);
    return match?.index === 0 && match[0].length === value.length;
}

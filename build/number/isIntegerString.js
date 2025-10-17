export const IntegerStringRegExp = /[\-\+]?\d+/;
export function isIntegerString(value) {
    if (!value)
        return false;
    const match = IntegerStringRegExp.exec(value);
    return match?.index === 0 && match[0].length === value.length;
}

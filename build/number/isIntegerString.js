export const IntegerRegExp = /[\-+]?\d+/;
export function isIntegerString(value) {
    if (!value)
        return false;
    const match = IntegerRegExp.exec(value);
    return match?.index === 0 && match[0].length === value.length;
}

const hexRegex = /^(0x|#)(?<digits>[0-9a-f]{3,8})$/i;
export function matchHex(value) {
    if (!value)
        return undefined;
    const match = hexRegex.exec(value.trim());
    const digits = match?.groups?.digits;
    if (!digits)
        return undefined;
    const digitCount = digits.length;
    const noAlpha = digitCount === 3 || digitCount === 6;
    const hasAlpha = digitCount === 4 || digitCount === 8;
    if (noAlpha || hasAlpha) {
        return { digits, hasAlpha };
    }
    return undefined;
}

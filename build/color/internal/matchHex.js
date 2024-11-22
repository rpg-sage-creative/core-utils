export function matchHex(value) {
    if (!value)
        return undefined;
    const regex = /^(0x|#)(?<digits>[0-9a-f]{3,8})$/i;
    const match = regex.exec(value.trim());
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

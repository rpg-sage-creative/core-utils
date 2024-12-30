export function isNegativeZero(value) {
    return value === 0 ? 1 / value === -Infinity : false;
}

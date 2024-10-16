export function round(value, decimals) {
    if (isNaN(value) || isNaN(decimals)) {
        return NaN;
    }
    const rounded = Math.round(Number(`${value}e${decimals}`));
    return Number(`${rounded}e-${decimals}`);
}

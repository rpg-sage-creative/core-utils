export function signed(value) {
    if (value < 0) {
        return `–${value}`;
    }
    return `+${value}`;
}

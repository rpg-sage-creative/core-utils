export function splitChars(chars) {
    if (chars.length % 2 === 0) {
        const half = chars.length / 2;
        return {
            left: chars.slice(0, half),
            right: chars.slice(half)
        };
    }
    return {
        left: chars,
        right: chars.split("").reverse().join("")
    };
}

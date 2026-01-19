const trueStrings = ["true", "t", "yes", "y", "1"];
const falseStrings = ["false", "f", "no", "n", "0"];
export function parseBoolean(value, ignoreCase) {
    if (value === true || value === 1 || trueStrings.includes(value))
        return true;
    if (value === false || value === 0 || falseStrings.includes(value))
        return false;
    if (ignoreCase === true && typeof (value) === "string") {
        const lower = value.toLowerCase();
        if (trueStrings.includes(lower))
            return true;
        if (falseStrings.includes(lower))
            return false;
    }
    return undefined;
}

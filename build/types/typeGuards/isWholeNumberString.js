let wholeNumberRegex;
export function isWholeNumberString(value) {
    if (typeof (value) === "string") {
        wholeNumberRegex ??= /^\d+$/;
        return wholeNumberRegex.test(value);
    }
    return false;
}

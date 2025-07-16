const wholeNumberRegex = /^\d+$/;
export function isWholeNumberString(value) {
    if (typeof (value) === "string") {
        return wholeNumberRegex.test(value);
    }
    return false;
}

export function isValidNumber(value) {
    return typeof (value) === "number" && isFinite(value);
}

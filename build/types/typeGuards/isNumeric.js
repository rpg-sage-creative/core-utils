export function isNumeric(value) {
    const type = typeof (value);
    return type === "number" || type === "bigint";
}

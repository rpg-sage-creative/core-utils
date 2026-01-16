export function parseBoolean(value, ignoreCase) {
    if (value === true || value === 1 || value === "true" || value === "1" || value === "yes")
        return true;
    if (value === false || value === 0 || value === "false" || value === "0" || value === "no")
        return false;
    if (ignoreCase === true && typeof (value) === "string") {
        const lower = value.toLowerCase();
        if (lower === "true" || lower === "yes")
            return true;
        if (lower === "false" || lower === "no")
            return false;
    }
    return undefined;
}

export function parseBoolean(value) {
    if (value === true || value === 1 || value === "true" || value === "1" || value === "yes")
        return true;
    if (value === false || value === 0 || value === "false" || value === "0" || value === "no")
        return false;
    return undefined;
}

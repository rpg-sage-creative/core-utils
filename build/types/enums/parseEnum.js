export function parseEnum(_enum, value, defaultValue) {
    if (value === null || value === undefined) {
        return defaultValue;
    }
    if (typeof (value) === "number") {
        return Object.values(_enum).find(val => val === value) ?? defaultValue;
    }
    const lower = String(value).toLowerCase();
    const enumKey = Object.keys(_enum).find(key => key.toLowerCase() === lower && typeof (_enum[key]) === "number");
    if (enumKey !== undefined) {
        return _enum[enumKey] ?? defaultValue;
    }
    return defaultValue;
}

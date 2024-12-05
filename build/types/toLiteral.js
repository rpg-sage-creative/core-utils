import { isDate } from "util/types";
export function toLiteral(value) {
    if (value === null)
        return "null";
    if (value === undefined)
        return "undefined";
    if (value) {
        if (Array.isArray(value)) {
            return `[${value.map(toLiteral).join(",")}]`;
        }
        if (isDate(value)) {
            return `Date("${value.toISOString()}")`;
        }
        if (value instanceof Map) {
            return `Map(${toLiteral([...value.entries()])})`;
        }
        if (value instanceof RegExp) {
            return `/${value.source}/${value.flags}`;
        }
        if (value instanceof Set) {
            return `Set(${toLiteral([...value.values()])})`;
        }
    }
    switch (typeof (value)) {
        case "bigint":
            return `${value}n`;
        case "object":
            const entries = [...Object.entries(value)];
            const mapped = entries.map(([key, val]) => `${toLiteral(key)}:${toLiteral(val)}`);
            return `{${mapped.join(",")}}`;
        case "string":
            return JSON.stringify(value);
        default:
            return String(value);
    }
}

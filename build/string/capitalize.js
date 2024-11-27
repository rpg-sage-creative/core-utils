import { isBlank } from "./blank/isBlank.js";
export function capitalize(value, splitter, joiner) {
    if (isBlank(value)) {
        return value;
    }
    if (splitter === null || splitter === undefined) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value
        .split(splitter)
        .map(s => capitalize(s))
        .join(joiner ?? (typeof (splitter) === "string" ? splitter : ""));
}

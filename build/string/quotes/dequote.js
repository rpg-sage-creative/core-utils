import { isQuoted } from "./isQuoted.js";
export function dequote(value, style) {
    return isQuoted(value, style) ? value.slice(1, -1) : value;
}

import {} from "./getQuotePairs.js";
import { isQuoted } from "./isQuoted.js";
export function dequote(value, options) {
    if (isQuoted(value, options)) {
        const left = value[0];
        const right = value[value.length - 1];
        const chars = left === right ? left : left + right;
        value = value.slice(1, -1);
        value = value.replace(new RegExp(`\\\\([\\\\${chars}])`, "g"), (_, char) => char);
    }
    return value;
}

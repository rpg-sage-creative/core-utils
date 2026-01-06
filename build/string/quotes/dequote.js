import { isQuotedOrMisquoted } from "./isQuotedOrMisquoted.js";
export function dequote(value) {
    if (isQuotedOrMisquoted(value)) {
        const left = value[0];
        const right = value[value.length - 1];
        value = value.slice(1, -1);
        value = value.replaceAll(`\\${left}`, left);
        if (left !== right) {
            value = value.replaceAll(`\\${right}`, right);
        }
    }
    return value;
}

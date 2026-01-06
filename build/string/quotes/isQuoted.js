import { isQuotedOrMisquoted } from "./isQuotedOrMisquoted.js";
export function isQuoted(value) {
    return isQuotedOrMisquoted(value) === "quoted";
}

import { isQuotedOrMisquoted } from "./isQuotedOrMisquoted.js";
export function isMisquoted(value) {
    return isQuotedOrMisquoted(value) === "misquoted";
}

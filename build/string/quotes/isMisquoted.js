import { isQuotedOrMisquoted } from "./isQuotedOrMisquoted.js";
/** Returns true if the value is properly quoted, false otherwise. */
export function isMisquoted(value) {
    return isQuotedOrMisquoted(value) === "misquoted";
}

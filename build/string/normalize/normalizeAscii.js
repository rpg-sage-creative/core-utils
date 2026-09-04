import { normalizeApostrophes } from "./normalizeApostrophes.js";
import { normalizeDashes } from "./normalizeDashes.js";
import { normalizeEllipses } from "./normalizeEllipses.js";
import { normalizeQuotes } from "./normalizeQuotes.js";
/**
 * Convenience for normalizeApostrophes(normalizeDashes(normalizeEllipses(normalizeQuotes(value)))).
 * Each normalize function is called (by default) if the options flag isn't explicitly false.
 */
export function normalizeAscii(text, options) {
    if (text) {
        const { apostrophes = true, dashes = true, ellipses = true, quotes = true } = options ?? {};
        if (apostrophes) {
            text = normalizeApostrophes(text);
        }
        if (dashes) {
            text = normalizeDashes(text);
        }
        if (ellipses) {
            text = normalizeEllipses(text);
        }
        if (quotes) {
            text = normalizeQuotes(text);
        }
    }
    return text;
}

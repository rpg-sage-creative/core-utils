import { splitChars } from "../string/index.js";
import { escapeRegex } from "./escapeRegex.js";
const cache = {};
function createCacheKey(options = {}) {
    const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
    const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
    return parts.join("|");
}
function createRegex(creator, options) {
    const { anchored, capture, spoilers, quantifier, wrapChars, wrapOptional } = options ?? {};
    let regexp = creator(options);
    if (quantifier) {
        regexp = new RegExp(`(?:${regexp.source})${quantifier}`, regexp.flags);
    }
    if (spoilers || wrapChars) {
        const { left, right } = splitChars(spoilers ? "||||" : wrapChars);
        const lPattern = escapeRegex(left);
        const rPattern = escapeRegex(right);
        regexp = spoilers === "optional" || wrapOptional === true
            ? new RegExp(`(?:${lPattern}(?:${regexp.source})${rPattern})|(?:${regexp.source})`, regexp.flags)
            : new RegExp(`${lPattern}(?:${regexp.source})${rPattern}`, regexp.flags);
    }
    if (capture) {
        regexp = new RegExp(`(?<${capture}>${regexp.source})`, regexp.flags);
    }
    if (anchored) {
        regexp = new RegExp(`^(?:${regexp.source})$`, regexp.flags);
    }
    return regexp;
}
export function getOrCreateRegex(creator, options) {
    if (options?.gFlag !== "g") {
        const { name } = creator;
        const cacheItem = cache[name] ?? (cache[name] = {});
        const key = createCacheKey(options);
        return cacheItem[key] ?? (cacheItem[key] = createRegex(creator, options));
    }
    return createRegex(creator, options);
}

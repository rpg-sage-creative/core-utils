import { debug, isLogLevelEnabled } from "../console/index.js";
import { splitChars } from "../string/wrap/splitChars.js";
import { escapeRegex } from "./escapeRegex.js";
const cache = {};
function createCacheKey(options = {}) {
    const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
    const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
    return parts.join("|");
}
function createRegex(creator, options) {
    const { anchored, capture, spoilers, quantifier, wrapChars, wrapOptional } = options ?? {};
    let { source, flags } = creator(options);
    if (quantifier) {
        source = `(?:${source})${quantifier}`;
    }
    if (spoilers || wrapChars) {
        const { left, right } = splitChars(spoilers ? "||||" : wrapChars);
        const lPattern = escapeRegex(left);
        const rPattern = escapeRegex(right);
        if (spoilers === "optional" || wrapOptional === true) {
            source = `(?:${lPattern}(?:${source})${rPattern})|(?:${source})`;
        }
        else {
            source = `${lPattern}(?:${source})${rPattern}`;
        }
    }
    if (capture) {
        source = `(?<${capture}>${source})`;
    }
    if (anchored) {
        source = `^(?:${source})$`;
    }
    return new RegExp(source, flags);
}
export function getOrCreateRegex(creator, options, cacheGlobal) {
    if (options?.gFlag !== "g" || cacheGlobal) {
        const { name } = creator;
        const cacheItem = cache[name] ?? (cache[name] = {});
        const cacheKey = createCacheKey(options);
        if (isLogLevelEnabled("debug")) {
            const existing = cacheItem[cacheKey];
            if (existing) {
                const updated = createRegex(creator, options);
                if (existing.source !== updated.source || existing.flags !== updated.flags) {
                    debug(`regex.cache[${name}][${cacheKey}] differs`);
                }
            }
        }
        return cacheItem[cacheKey] ??= createRegex(creator, options);
    }
    return createRegex(creator, options);
}

import { warn } from "../console/index.js";
import { splitChars } from "../string/wrap/splitChars.js";
import { isErrorLike } from "../types/typeGuards/isErrorLike.js";
import { escapeRegex } from "./escapeRegex.js";
import { indexCaptureGroups } from "./internal/indexCaptureGroups.js";
const cache = {};
function createCacheKey(options = {}) {
    const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
    const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
    return parts.join("|");
}
function createRegex(creator, options, cacheKey) {
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
    try {
        return new RegExp(source, flags);
    }
    catch (ex) {
        const isDuplicateCaptureGroup = isErrorLike(ex, err => err.name === "SyntaxError"
            && err.message.startsWith("Invalid regular expression")
            && err.message.endsWith("Duplicate capture group name"));
        if (isDuplicateCaptureGroup) {
            warn(`isDuplicateCaptureGroup: ${cacheKey ?? createCacheKey(options)}`);
            return new RegExp(indexCaptureGroups(source), flags);
        }
        throw ex;
    }
}
export function getOrCreateRegex(creator, options) {
    if (options?.gFlag !== "g") {
        const { name } = creator;
        const cacheItem = cache[name] ?? (cache[name] = {});
        const cacheKey = createCacheKey(options);
        return cacheItem[cacheKey] ??= createRegex(creator, options, cacheKey);
    }
    return createRegex(creator, options);
}

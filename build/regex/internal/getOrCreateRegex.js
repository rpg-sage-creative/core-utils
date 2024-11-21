const cache = {};
function createCacheKey(options = {}) {
    const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
    const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
    return parts.join("|");
}
export function getOrCreateRegex(createRegex, options) {
    if (options?.gFlag) {
        return createRegex(options);
    }
    const { name } = createRegex;
    const cacheItem = cache[name] ?? (cache[name] = {});
    const key = createCacheKey(options);
    return cacheItem[key] ?? (cacheItem[key] = createRegex(options));
}

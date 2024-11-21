import type { RegExpCreateOptions } from "../RegExpOptions.js";

/**
 * Stores each unique instance to avoid duplicating regex when not needed.
 * The map key is the regex create function name.
 * The map value is an object containing each permutation of the regexp based on options.
 */
const cache: { [key: string]: { [key: string]: RegExp; }; } = {};

/** Creates the unique key for each variant based on options. */
function createCacheKey<T extends RegExpCreateOptions>(options: T = {} as T): string {
	const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
	const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
	return parts.join("|");
}

type CreateRegexFunction<T extends RegExpCreateOptions> = (options?: T) => RegExp;

/**
 * @internal
 * Returns a cached instance of the given regex if the gFlag is not set.
 * This allows us to cache non-global regex values where we don't need to worry about lastIndex.
 */
export function getOrCreateRegex<T extends RegExpCreateOptions>(createRegex: CreateRegexFunction<T>, options?: T): RegExp {
	if (options?.gFlag) {
		return createRegex(options);
	}
	const { name } = createRegex;
	const cacheItem = cache[name] ?? (cache[name] = {});
	const key = createCacheKey(options);
	return cacheItem[key] ?? (cacheItem[key] = createRegex(options));
}

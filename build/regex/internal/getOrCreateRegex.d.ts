import type { RegExpFlagOptions } from "../RegExpOptions.js";
type CreateRegexFunction<T extends RegExpFlagOptions, U extends RegExp> = (options?: T) => U;
/**
 * Returns a cached instance of the given regex if the gFlag is not set.
 * This allows us to cache non-global regex values where we don't need to worry about lastIndex.
 */
export declare function getOrCreateRegex<T extends RegExpFlagOptions, U extends RegExp>(createRegex: CreateRegexFunction<T, U>, options?: T): RegExp;
export {};

import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions, RegExpSpoilerOptions, RegExpWrapOptions } from "./RegExpOptions.js";
export type RegExpGetOptions = RegExpAnchorOptions & RegExpCaptureOptions & RegExpFlagOptions & RegExpQuantifyOptions & RegExpSpoilerOptions & RegExpWrapOptions;
type CreateRegexFunction<T extends RegExpGetOptions, U extends RegExp> = (options?: T) => U;
/**
 * Returns a cached instance of the given regex if the gFlag is not set.
 * This allows us to cache non-global regex values where we don't need to worry about lastIndex.
 * Because String.replace(RegExp, ...) safely manages the lastIndex of the RegExp, the cacheGlobal param allows us to create and reuse global regexes.
 */
export declare function getOrCreateRegex<T extends RegExpGetOptions, U extends RegExp>(creator: CreateRegexFunction<T, U>, options?: T, cacheGlobal?: true): RegExp;
export {};

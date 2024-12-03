import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions, RegExpSpoilerOptions, RegExpWrapOptions } from "./RegExpOptions.js";
export type RegExpGetOptions = RegExpAnchorOptions & RegExpCaptureOptions & RegExpFlagOptions & RegExpQuantifyOptions & RegExpSpoilerOptions & RegExpWrapOptions;
type CreateRegexFunction<T extends RegExpGetOptions, U extends RegExp> = (options?: T) => U;
/**
 * Returns a cached instance of the given regex if the gFlag is not set.
 * This allows us to cache non-global regex values where we don't need to worry about lastIndex.
 */
export declare function getOrCreateRegex<T extends RegExpGetOptions, U extends RegExp>(creator: CreateRegexFunction<T, U>, options?: T): RegExp;
export {};

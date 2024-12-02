import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpSpoilerOptions } from "../regex/RegExpOptions.js";
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions;
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export declare function getNumberRegex(options?: Options): RegExp;
export {};

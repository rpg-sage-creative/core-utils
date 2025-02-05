import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpSpoilerOptions } from "../regex/RegExpOptions.js";
type NumberOptions = {
    /** default is optional */
    sign?: "none" | "required";
    /** default is either */
    type?: "decimal" | "integer";
};
type GetOptions = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions & NumberOptions;
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export declare function getNumberRegex(options?: GetOptions): RegExp;
export {};

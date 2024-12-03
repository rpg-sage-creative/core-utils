import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions, RegExpSpoilerOptions, RegExpWrapOptions } from "../../regex/RegExpOptions.js";
export declare const WHITESPACE_REGEX_SOURCE = "\\s";
export declare const HORIZONTAL_WHITESPACE_REGEX_SOURCE = "[^\\S\\r\\n]";
type WhitespaceOptions = {
    /** uses HORIZONTAL_WHITESPACE_REGEX_SOURCE if true, \s otherwise */
    horizontalOnly?: boolean;
};
type CreateOptions = RegExpFlagOptions & RegExpQuantifyOptions & WhitespaceOptions;
type GetOptions = CreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpSpoilerOptions & RegExpWrapOptions;
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:false, horizontalOnly:false, iFlag:false, quantifier:"+" }
 */
export declare function getWhitespaceRegex(options?: GetOptions): RegExp;
export {};

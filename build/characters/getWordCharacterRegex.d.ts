import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions } from "../regex/RegExpOptions.js";
/** Expected to be used inside a character class: `[${WORD_CHARACTERS_REGEX_PARTIAL_SOURCE}]` */
export type RegexWordCharOptions = {
    /** Determines if dashes are allowed. Default: false */
    allowDashes?: boolean;
    /** Determines if periods are allowed. Default: false */
    allowPeriods?: boolean;
};
type CreateOptions = RegExpFlagOptions & RegexWordCharOptions;
type GetOptions = CreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions;
/**
 * Returns an instance of the word character regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, anchored:false, capture:undefined, gFlag:false, iFlag:false, quantifier:"" }
 */
export declare function getWordCharacterRegex(options?: GetOptions): RegExp;
export {};

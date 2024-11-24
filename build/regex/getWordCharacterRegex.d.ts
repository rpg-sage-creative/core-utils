import type { RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "./RegExpOptions.js";
/** Expected to be used inside a character class: `[${WORD_CHARACTERS_REGEX_PARTIAL_SOURCE}]` */
type Options = RegExpCreateOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
    /** determines if dashes are allowed */
    allowDashes?: boolean;
    /** determines if periods are allowed */
    allowPeriods?: boolean;
};
/**
 * Returns an instance of the word character regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, capture:undefined, gFlag:false, iFlag:false, quantifier:"" }
 */
export declare function getWordCharacterRegex(options?: Options): RegExp;
export {};
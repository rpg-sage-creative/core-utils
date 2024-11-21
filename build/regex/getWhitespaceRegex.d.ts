import { type RegExpQuantifier } from "./quantifyRegex.js";
type Options = {
    /** capture the RegExp with a named capture group */
    capture?: string;
    /** include the global flag in the regex */
    gFlag?: "g" | "";
    /** uses HORIZONTAL_WHITESPACE_REGEX if true, \s otherwise */
    horizontalOnly?: boolean;
    /** include the case insensitive flag in the regex */
    iFlag?: "i" | "";
    /** how many to capture */
    quantifier?: RegExpQuantifier;
};
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { capture:undefined, gFlag:false, horizontalOnly:false, iFlag:false, quantifier:"+" }
 */
export declare function getWhitespaceRegex(options?: Options): RegExp;
export {};

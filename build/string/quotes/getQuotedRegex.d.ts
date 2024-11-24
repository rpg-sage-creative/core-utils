import type { RegExpQuantifier } from "../../regex/quantifyRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";
/**
 * "any" all double and single quotes, no limitations
 *
 * "double" limits to double quotes
 * "single" limits to single quotes
 *
 * "strict" limits to pure "double" and 'single' quotes
 * "fancy" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes
 *
 * "double-strict" limits to pure "double" quotes
 * "double-fancy" limits to pure "double" and curly “double” quotes
 *
 * "single-strict" limits to pure 'single' quotes
*/
export type QuoteStyle = "any" | "double" | "single" | "strict" | "fancy" | "double-strict" | "double-fancy" | "single-strict";
export type RegExpQuoteOptions = {
    /** Specifies allowed number of characters inside the quotes. */
    quantifier?: RegExpQuantifier;
    /** Specifies limitations to the style of quotes allowed. */
    style?: QuoteStyle;
};
type Options = RegExpCreateOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuantifyOptions & RegExpQuoteOptions;
/**
 * Returns an instance of the quoted regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, extended:true, gFlag:"", iFlag:"", quantifier:"+", singleDouble:"both", strict:false }
 */
export declare function getQuotedRegex(options?: Options): RegExp;
export {};

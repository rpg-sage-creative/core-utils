import type { RegExpQuantifier } from "../../regex/quantifyRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions } from "../../regex/RegExpOptions.js";
import { type QuoteStyle } from "./getQuotePairs.js";
export type RegExpQuoteOptions = {
    /** Specifies allowed number of characters inside the quotes. */
    quantifier?: RegExpQuantifier;
    /** Specifies limitations to the style of quotes allowed. */
    style?: QuoteStyle;
};
type Options = RegExpFlagOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuantifyOptions & RegExpQuoteOptions;
/**
 * Returns an instance of the quoted regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:"", iFlag:"", quantifier:"+", style:"any" }
 */
export declare function getQuotedRegex(options?: Options): RegExp;
export {};

import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifier } from "../../regex/RegExpOptions.js";
import { type QuoteStyle } from "./getQuotePairs.js";
export type RegExpQuoteOptions = {
    /** Specifies allowed number of characters inside the quotes. */
    contents?: RegExpQuantifier;
    /** Specifies limitations to the style of quotes allowed. */
    style?: QuoteStyle;
};
export type QuotedRegexRegExp = RegExp & {
    leftChars: string;
    rightChars: string;
};
type GetOptions = RegExpFlagOptions & RegExpCaptureOptions & RegExpAnchorOptions & RegExpQuoteOptions;
/**
 * Returns an instance of the quoted regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:"", iFlag:"", contents:"+", style:"any" }
 */
export declare function getQuotedRegex(options?: GetOptions): QuotedRegexRegExp;
export {};

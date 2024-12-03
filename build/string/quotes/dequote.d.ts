import type { RegExpQuantifier } from "../../regex/RegExpOptions.js";
import type { QuoteStyle } from "./getQuotePairs.js";
type Options = {
    style?: QuoteStyle;
    quantifier?: RegExpQuantifier;
};
/** Removes first and last character if they are both quotes. */
export declare function dequote(value: string, options?: Options): string;
export {};

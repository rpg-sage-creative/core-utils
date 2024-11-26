import type { RegExpQuantifier } from "../../regex/quantifyRegex.js";
import type { Optional } from "../../types/generics.js";
import type { QuoteStyle } from "./getQuotePairs.js";
type Options = {
    style?: QuoteStyle;
    quantifier?: RegExpQuantifier;
};
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isQuoted(value: Optional<string>, options?: Options): boolean;
export {};

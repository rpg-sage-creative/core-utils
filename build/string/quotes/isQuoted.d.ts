import { type QuoteStyle } from "../../regex/getQuotedRegex.js";
import type { Optional } from "../../types/generics.js";
/** Returns true if the value begins and ends in quotes, false otherwise. */
export declare function isQuoted(value: Optional<string>, style?: QuoteStyle): boolean;

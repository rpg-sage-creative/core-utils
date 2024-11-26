import type { Optional } from "../../types/generics.js";
import type { QuoteStyle } from "./getQuotePairs.js";
/** Returns true if the value begins and ends in quotes, false otherwise. */
export declare function isQuoted(value: Optional<string>, style?: QuoteStyle): boolean;

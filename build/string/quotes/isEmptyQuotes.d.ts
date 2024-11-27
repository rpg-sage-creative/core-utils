import type { Optional } from "../../types/generics.js";
import { type QuoteStyle } from "./getQuotePairs.js";
export declare function isEmptyQuotes(value: Optional<string>, style?: QuoteStyle): value is string;

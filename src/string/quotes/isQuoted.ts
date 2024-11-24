import type { Optional } from "../../types/generics.js";
import { getQuotedRegex, type QuoteStyle } from "./getQuotedRegex.js";

/** Returns true if the value begins and ends in quotes, false otherwise. */
export function isQuoted(value: Optional<string>, style?: QuoteStyle): boolean {
	return value ? getQuotedRegex({ anchored:true, style }).test(value) : false;
}

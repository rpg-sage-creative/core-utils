import { getQuotedRegex, type QuoteStyle } from "../../regex/getQuotedRegex.js";
import type { Optional } from "../../types/generics.js";

/** Returns true if the value begins and ends in quotes, false otherwise. */
export function isQuoted(value: Optional<string>, style?: QuoteStyle): boolean {
	const regex = getQuotedRegex({ anchored:true, style });
	return value ? regex.test(value) : false;
}

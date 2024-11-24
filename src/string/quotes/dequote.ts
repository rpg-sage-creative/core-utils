import type { QuoteStyle } from "./getQuotedRegex.js";
import { isQuoted } from "./isQuoted.js";

/** Removes first and last character if they are both quotes. */
export function dequote(value: string, style?: QuoteStyle): string {
	return isQuoted(value, style) ? value.slice(1, -1) : value;
}
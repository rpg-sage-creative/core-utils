import { getKeyValueArgRegex } from "../../args/getKeyValueArgRegex.js";
import type { Optional } from "../../types/generics.js";

export function redactKeyValuePairs(content: string): string;
export function redactKeyValuePairs(content: Optional<string>): Optional<string>;
export function redactKeyValuePairs(content: Optional<string>): Optional<string> {
	if (!content) return content;
	const regexp = getKeyValueArgRegex({ allowDashes:true, allowPeriods:true, gFlag:"g" });
	return content.replace(regexp, pair => "".padEnd(pair.length, "*"));
}
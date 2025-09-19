import { getKeyValueArgRegex } from "../../args/getKeyValueArgRegex.js";
import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
import type { Optional } from "../../types/generics.js";

export function redactKeyValuePairs(content: string, redactedCharacter?: string): string;
export function redactKeyValuePairs(content: Optional<string>, redactedCharacter?: string): Optional<string>;
export function redactKeyValuePairs(content: Optional<string>, redactedCharacter = "*"): Optional<string> {
	if (!content) return content;
	const regexp = getKeyValueArgRegex({ allowDashes:true, allowPeriods:true, gFlag:"g" });
	return content.replace(regexp, pair => {
		const kvPair = parseKeyValueArg(pair, { allowDashes:true, allowPeriods:true })!;
		const key = "".padEnd(kvPair.key.length, redactedCharacter);
		const value = "".padEnd(kvPair.value?.length ?? 0, redactedCharacter);
		return `${key}="${value}"`;
	});
}
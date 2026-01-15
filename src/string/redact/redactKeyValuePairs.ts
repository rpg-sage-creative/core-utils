import { parseKeyValueArg } from "../../args/parseKeyValueArg.js";
import { KeyValueArgRegExpG } from "../../args/parseKeyValueArgs.js";
import type { Optional } from "../../types/generics.js";

export function redactKeyValuePairs(content: string, redactedCharacter?: string): string;
export function redactKeyValuePairs(content: Optional<string>, redactedCharacter?: string): Optional<string>;
export function redactKeyValuePairs(content: Optional<string>, redactedCharacter = "*"): Optional<string> {
	if (!content) return content;
	return content.replace(KeyValueArgRegExpG, pair => {
		const kvPair = parseKeyValueArg(pair)!;
		const key = "".padEnd(kvPair.key.length, redactedCharacter);
		const value = "".padEnd(kvPair.value?.length ?? 0, redactedCharacter);
		const q = kvPair.isNaked ? '' : '"';
		return key + "=" + q + value + q;
	});
}
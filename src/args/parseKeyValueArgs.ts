import { getKeyValueArgRegex, type RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import type { KeyValueArg } from "./KeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";


/**
 * Returns an array of KeyValueArg values found in the given string.
 */
export function parseKeyValueArgs(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg[] {
	const regexp = getKeyValueArgRegex({ ...options, gFlag:"g" });
	const matches = input?.match(regexp) ?? [];
	const args = matches.map(match => parseKeyValueArg(match));
	return args.filter(arg => arg) as KeyValueArg[];
}
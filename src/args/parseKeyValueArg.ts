import { dequote, quote } from "../string/index.js";
import type { KeyValueArg } from "./KeyValueArg.js";
import type { RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import { isKeyValueArg } from "./isKeyValueArg.js";

/**
 * Returns KeyValueArg if the input is a valid key/value pairing, null otherwise.
 * If key is given then the key must match the valid key/value pair.
 */
export function parseKeyValueArg(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg | undefined {
	if (isKeyValueArg(input, options)) {
		const index = input.indexOf("=");
		// Because we are currently allowing spaces around the "=" character, we need to trim the raw key
		const key = input.slice(0, index).trim();
		const keyLower = key.toLowerCase();
		// Because we are currently allowing spaces around the "=" character, we need to trim the raw value
		const trimmed = input.slice(index + 1).trim();
		const value = dequote(trimmed, { quantifier:"*"});
		const quoted = quote(value);
		const clean = `${keyLower}=${quoted}`;
		return { key, keyLower, value, clean };
	}
	return undefined;
}
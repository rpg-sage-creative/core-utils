import type { RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import { parseValidKeyValueArg } from "./internal/parseValidKeyValueArg.js";
import { isKeyValueArg } from "./isKeyValueArg.js";
import type { KeyValueArg } from "./types.js";

/**
 * Returns KeyValueArg if the input is a valid key/value pairing, undefined otherwise.
 * If key is given then the key must match the valid key/value pair.
 */
export function parseKeyValueArg<ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<string, ValueType> | undefined;

export function parseKeyValueArg<KeyType extends string = string, ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<KeyType, ValueType> | undefined;

export function parseKeyValueArg(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg | undefined {
	if (isKeyValueArg(input, options)) {
		return parseValidKeyValueArg(input);
	}
	return undefined;
}
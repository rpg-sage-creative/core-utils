import { getKeyValueArgRegex, type RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import { parseValidKeyValueArg } from "./internal/parseValidKeyValueArg.js";
import type { KeyValueArg } from "./types.js";


/** Returns an array of KeyValueArg values found in the given string. */
export function parseKeyValueArgs<ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<string, ValueType>[];

export function parseKeyValueArgs<KeyType extends string = string, ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<KeyType, ValueType>[];

export function parseKeyValueArgs(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg[] {
	const regexp = getKeyValueArgRegex({ ...options, gFlag:"g" });
	const matches = input?.match(regexp) ?? [];
	const args = matches.map(parseValidKeyValueArg);
	return args.filter(arg => arg);
}
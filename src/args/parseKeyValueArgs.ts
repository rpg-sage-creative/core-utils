import { globalizeRegex } from "../regex/globalizeRegex.js";
import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import { KeyValueArgRegExp, parseKeyValueArg, type KeyValueArgMatchGroups } from "./parseKeyValueArg.js";
import type { KeyValueArg } from "./types.js";

export const KeyValueArgRegExpG = globalizeRegex<TypedRegExp<KeyValueArgMatchGroups>>(KeyValueArgRegExp);

/** Returns an array of KeyValueArg values found in the given string. */
export function parseKeyValueArgs<ValueType extends string = string>(input: Optional<string>): KeyValueArg<string, ValueType>[];
export function parseKeyValueArgs<KeyType extends string = string, ValueType extends string = string>(input: Optional<string>): KeyValueArg<KeyType, ValueType>[];
export function parseKeyValueArgs(input: Optional<string>): KeyValueArg[] {
	if (!input) return [];
	const matches = input.match(KeyValueArgRegExpG) ?? [];
	const args = matches.map(arg => parseKeyValueArg(arg));
	return args.filter(arg => arg) as KeyValueArg[];
}
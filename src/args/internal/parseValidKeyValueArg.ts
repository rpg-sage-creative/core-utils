import { dequote } from "../../string/quotes/dequote.js";
import type { KeyValueArg } from "../types.js";

/**
 * @internal
 * This assumes you have already validated that the input is a key/value pair.
 * @todo find out why we are allowing spaces around equals signs
 */

export function parseValidKeyValueArg<ValueType extends string = string>(arg: ValueType): KeyValueArg<string, ValueType>;

export function parseValidKeyValueArg<KeyType extends string = string, ValueType extends string = string>(arg: string): KeyValueArg<KeyType, ValueType>;

export function parseValidKeyValueArg(arg: string): KeyValueArg {
	const index = arg.indexOf("=");
	// Because we are currently allowing spaces around the "=" character, we need to trim the raw key
	const key = arg.slice(0, index).trim();
	const keyRegex = new RegExp(`^${key}$`, "i");
	// Because we are currently allowing spaces around the "=" character, we need to trim the raw value
	const trimmed = arg.slice(index + 1).trim();
	const value = dequote(trimmed, { contents:"*"});
	return { arg, index:-1, isKeyValue:true, key, keyRegex, value };
}
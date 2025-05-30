import { type RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import type { KeyValueArg } from "./types.js";
/** Returns an array of KeyValueArg values found in the given string. */
export declare function parseKeyValueArgs<ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<string, ValueType>[];
export declare function parseKeyValueArgs<ArgType extends string = string, ValueType extends string = string>(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg<ArgType, ValueType>[];

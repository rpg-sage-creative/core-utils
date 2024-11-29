import { type RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
import type { KeyValueArg } from "./KeyValueArg.js";
/**
 * Returns an array of KeyValueArg values found in the given string.
 */
export declare function parseKeyValueArgs(input: string, options?: RegExpKeyValueArgOptions): KeyValueArg[];

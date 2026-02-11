import type { Optional } from "@rsc-utils/type-utils";
import type { KeyValueArg } from "./types.js";
export declare const KeyValueArgRegExpG: import("@rsc-utils/type-utils").TypedRegExp<import("./parseKeyValueArg.js").KeyValueArgMatchGroups, string, string | undefined>;
/** Returns an array of KeyValueArg values found in the given string. */
export declare function parseKeyValueArgs<ValueType extends string = string>(input: Optional<string>): KeyValueArg<string, ValueType>[];
export declare function parseKeyValueArgs<KeyType extends string = string, ValueType extends string = string>(input: Optional<string>): KeyValueArg<KeyType, ValueType>[];

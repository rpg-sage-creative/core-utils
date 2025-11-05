import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import type { KeyValueArg } from "./types.js";
export type KeyValueArgMatchGroups = {
    key: string;
    value: string;
};
export declare const KeyValueArgRegExp: TypedRegExp<KeyValueArgMatchGroups>;
/**
 * Returns KeyValueArg if the input is a valid key/value pairing, undefined otherwise.
 * If key is given then the key must match the valid key/value pair.
 */
export declare function parseKeyValueArg<ValueType extends string = string>(input: Optional<string>, index?: number): KeyValueArg<string, ValueType> | undefined;
export declare function parseKeyValueArg<KeyType extends string = string, ValueType extends string = string>(input: Optional<string>, index?: number): KeyValueArg<KeyType, ValueType> | undefined;

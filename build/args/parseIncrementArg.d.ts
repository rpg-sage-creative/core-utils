import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import type { IncrementArg } from "./types.js";
type IncrementArgMatchGroups = {
    key: string;
    decrement?: "--";
    increment?: "++";
    operator?: "+=" | "-=";
    value: string;
};
export declare const IncrementArgRegExp: TypedRegExp<IncrementArgMatchGroups>;
export declare function parseIncrementArg<ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<string, ValueType> | undefined;
export declare function parseIncrementArg<KeyType extends string = string, ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<KeyType, ValueType> | undefined;
export {};

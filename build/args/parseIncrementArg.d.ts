import type { IncrementArg, Optional, TypedRegExp } from "../index.js";
type IncrementArgMatchGroups = {
    key: string;
    decrement?: "--" | "\u2014";
    increment?: "++";
    operator?: "+=" | "-=";
    value: string;
};
export declare const IncrementArgRegExp: TypedRegExp<IncrementArgMatchGroups>;
export declare function parseIncrementArg<ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<string, ValueType> | undefined;
export declare function parseIncrementArg<KeyType extends string = string, ValueType extends string = string>(raw: Optional<string>, index?: number): IncrementArg<KeyType, ValueType> | undefined;
export {};

import { type RegExpIncrementArgOptions } from "./getIncrementArgRegex.js";
import type { IncrementArg } from "./types.js";
export declare function parseIncrementArg<ValueType extends string = string>(input: string, options?: RegExpIncrementArgOptions): IncrementArg<string, ValueType> | undefined;
export declare function parseIncrementArg<KeyType extends string = string, ValueType extends string = string>(input: string, options?: RegExpIncrementArgOptions): IncrementArg<KeyType, ValueType> | undefined;

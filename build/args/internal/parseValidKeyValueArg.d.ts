import type { KeyValueArg } from "../types.js";
export declare function parseValidKeyValueArg<KeyType extends string = string, ValueType extends string = string>(arg: string): KeyValueArg<KeyType, ValueType>;

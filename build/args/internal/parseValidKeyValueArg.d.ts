import type { KeyValueArg } from "../types.js";
export declare function parseValidKeyValueArg<ArgType extends string = string, ValueType extends string = string>(arg: ArgType): KeyValueArg<ArgType, ValueType>;

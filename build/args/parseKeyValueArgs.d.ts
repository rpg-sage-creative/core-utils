import { type KeyValueArgMode } from "./getKeyValueArgRegex.js";
import { type KeyValueArg } from "./KeyValueArg.js";
type Options = {
    key?: string;
    mode?: KeyValueArgMode;
};
export declare function parseKeyValueArgs(input: string, options?: Options): KeyValueArg[];
export {};

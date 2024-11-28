import { type KeyValueArg } from "./KeyValueArg.js";
import { type KeyValueArgMode } from "./getKeyValueArgRegex.js";
type Options = {
    key?: string;
    mode?: KeyValueArgMode;
};
/**
 * Returns KeyValueArg if the input is a valid key/value pairing, null otherwise.
 * If key is given then the key must match the valid key/value pair.
 */
export declare function parseKeyValueArg(input: string, options?: Options): KeyValueArg | null;
export {};

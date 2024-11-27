import { type KeyValueArg } from "./KeyValueArg.js";
/** Returns KeyValueArg if the input is a valid key/value pairing, null otherwise. */
export declare function parseKeyValueArg(input: string): KeyValueArg | null;
/** Returns KeyValueArg if the input is a valid key/value pairing that matches the given key, null otherwise. */
export declare function parseKeyValueArg(input: string, key: string): KeyValueArg | null;

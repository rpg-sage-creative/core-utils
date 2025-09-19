import type { RegExpWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpQuoteOptions } from "../string/index.js";
import { type RegExpKeyValueArgOptions } from "./getKeyValueArgRegex.js";
type Options = RegExpWordCharOptions & RegExpQuoteOptions & RegExpKeyValueArgOptions;
/**
 * Returns true if the value is `key=value` or `key="value"` or `key=""`.
 * If a key is given, then the key must match.
 * The key/value pair must be "anchored" for this to return true.
 */
export declare function isKeyValueArg(value: string, options?: Options): boolean;
export {};

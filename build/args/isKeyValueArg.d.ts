import type { RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpQuoteOptions } from "../string/index.js";
import { type KeyValueArgMode } from "./getKeyValueArgRegex.js";
type Options = RegexWordCharOptions & RegExpQuoteOptions & {
    /** Specifiies a key literal. */
    key?: string;
    /** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
    mode?: KeyValueArgMode;
};
/**
 * Returns true if the value is key=value or key="value" or key="".
 * If a key is given, then the key must match.
 */
export declare function isKeyValueArg(value: string, options?: Options): boolean;
export {};

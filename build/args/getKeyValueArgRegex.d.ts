import { type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions, RegExpQuantifyOptions } from "../regex/RegExpOptions.js";
import { type RegExpQuoteOptions } from "../string/index.js";
/**
 * strict:  spaces around the pair: required, quotes: required
 * default: spaces around the pair: required, quotes: optional
 * sloppy:  spaces around the pair: optional, quotes: optional
 */
type KeyValueArgMode = "default" | "strict" | "sloppy";
type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
    /** Specifiies a key literal or a pattern based the options. */
    key?: string | RegexWordCharOptions;
    /** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
    mode?: KeyValueArgMode;
    /** Specifies the options used when creating the quoted regex. */
    quotes?: RegExpQuoteOptions;
};
/**
 * Returns an instance of the KeyValueArg regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { capture:undefined, gFlag:"", iFlag:"i", key:undefined, mode:"default", quotes:{ quantifier:"*", style:undefined } }
 */
export declare function getKeyValueArgRegex(options?: Options): RegExp;
export {};

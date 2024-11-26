import { type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions } from "../regex/RegExpOptions.js";
import { type RegExpQuoteOptions } from "../string/index.js";
/**
 * strict:  spaces around the pair: required, quotes: required
 * default: spaces around the pair: required, quotes: optional
 * sloppy:  spaces around the pair: optional, quotes: optional
 */
type KeyValueArgMode = "default" | "strict" | "sloppy";
type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegexWordCharOptions & RegExpQuoteOptions & {
    /** Specifiies a key literal. */
    key?: string;
    /** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
    mode?: KeyValueArgMode;
};
/**
 * Returns an instance of the KeyValueArg regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, capture:undefined, gFlag:"", iFlag:"i", key:undefined, mode:"default", quantifier:"*", style:undefined }
 * Setting style to anything other than "any" forces mode to "strict".
 */
export declare function getKeyValueArgRegex(options?: Options): RegExp;
export {};

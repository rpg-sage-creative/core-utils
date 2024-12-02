import { type RegexWordCharOptions } from "../characters/getWordCharacterRegex.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions } from "../regex/RegExpOptions.js";
import { type RegExpQuoteOptions } from "../string/index.js";
/**
 * strict:  spaces around the pair: required, quotes: required
 * default: spaces around the pair: required, quotes: optional
 * sloppy:  spaces around the pair: optional, quotes: optional
 */
export type KeyValueArgMode = "default" | "strict" | "sloppy";
export type RegExpKeyValueArgOptions = {
    /** Specifiies a key literal. */
    key?: string;
    /** Specifies if quotes are required or if we can allow spaces around the equals (=) sign. */
    mode?: KeyValueArgMode;
};
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegexWordCharOptions & RegExpQuoteOptions & RegExpKeyValueArgOptions;
/**
 * Returns an instance of the KeyValueArg regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, capture:undefined, gFlag:"", iFlag:"i", key:undefined, mode:"default", quantifier:"*", style:undefined }
 * Setting style to anything other than "any" forces mode to "strict".
 */
export declare function getKeyValueArgRegex(options?: Options): RegExp;
export {};

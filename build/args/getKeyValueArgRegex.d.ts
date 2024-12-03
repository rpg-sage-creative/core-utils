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
type CreateOptions = RegExpFlagOptions & RegexWordCharOptions & RegExpQuoteOptions & RegExpKeyValueArgOptions;
type GetOptions = CreateOptions & RegExpAnchorOptions & RegExpCaptureOptions;
/**
 * Returns an instance of the KeyValueArg regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { allowDashes:false, allowPeriods:false, contents:"*", iFlag:"i", mode:"default", style:"any" }
 * Setting style to anything other than "any" forces mode to "strict".
 */
export declare function getKeyValueArgRegex(options?: GetOptions): RegExp;
export {};

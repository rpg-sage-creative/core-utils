import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions } from "../../regex/RegExpOptions.js";
type WrapOptions = {
    /** expects the two characters used to wrap the url, ex: <> for discord */
    wrapChars?: string;
    /** determines if the .wrapped value is optional or not */
    wrapOptional?: boolean;
};
type GetOptions = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & WrapOptions;
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export declare function getUrlRegex(options?: GetOptions): RegExp;
export {};

import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpCreateOptions } from "../../regex/RegExpOptions.js";
type Options = RegExpCreateOptions & RegExpAnchorOptions & RegExpCaptureOptions & {
    /** use ^ and $ to anchor the url to the start/end of the string */
    anchored?: boolean;
    /** expects the two characters used to wrap the url, ex: <> for discord */
    wrapChars?: string;
    /** determines if the .wrapped value is optional or not */
    wrapOptional?: boolean;
};
/**
 * Returns an instance of the number regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 */
export declare function getUrlRegex(options?: Options): RegExp;
export {};

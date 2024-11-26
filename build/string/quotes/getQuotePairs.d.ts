/**
 * "any" all double and single quotes, no limitations
 *
 * "double" limits to double quotes
 * "single" limits to single quotes
 *
 * "strict" limits to pure "double" and 'single' quotes
 * "fancy" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes
 * "extended" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes as well as „German“ and „Polish” double quotes
 *
 * "double-strict" limits to pure "double" quotes
 * "double-fancy" limits to pure "double" and curly “double” quotes
 * "double-extended" limits to pure "double" and curly “double” quotes as well as „German“ and „Polish” double quotes
 *
 * "single-strict" limits to pure 'single' quotes
*/
export type QuoteStyle = "any" | "strict" | "fancy" | "extended" | "double" | "double-strict" | "double-fancy" | "double-extended" | "single" | "single-strict";
/** Represents the characters (and their metadata) used in quoting comments, dialog, or string values. */
type QuotePair = {
    /** The two characters that make up the pair of quotes, ex: "" or '' or “” or ‘’ */
    chars: string;
    /** Specifies if this pair is considered single quotes. */
    isSingle: boolean;
    /** Specifies if this pair is considered double quotes. */
    isDouble: boolean;
    /** Specifies if this pair is considered fancy quotes. */
    isFancy: boolean;
    /** Specifies if this pair is valid but not normally used quotes. Ex: „” */
    isExtended: boolean;
    /** Specifies if this pair is valid but uses arrows. Ex: „” */
    isArrow: boolean;
};
/** Creates and returns an array of quote pairs and their attributes. */
export declare function getQuotePairs(style?: QuoteStyle): QuotePair[];
export {};

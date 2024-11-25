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
};
/** Creates and returns an array of quote pairs and their attributes. */
export declare function getQuotePairs(): QuotePair[];
export {};

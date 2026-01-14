/** A single reusable regexp for letters and numbers beyond \w; [ \w \p{L} \p{N} ] */
export declare const AlphaNumericRegExp: RegExp;
/** A single reusable regexp for letters and numbers dashes and dots beyond \w, \-, \.; [ \w \p{L} \p{N} \- \. ] */
export declare const AlphaNumericDashDotRegExp: RegExp;
/** Ensures that the key starts and ends with alpha numeric values while allowing dashes and dots within. */
export declare const AlphaNumericDashDotArgKeyRegExp: RegExp;

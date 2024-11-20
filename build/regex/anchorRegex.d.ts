/**
 * Returns RegExp that is properly "anchored" using ^ and $.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export declare function anchorRegex(regexp: RegExp): RegExp;

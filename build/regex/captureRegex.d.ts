/**
 * Returns RegExp that is properly captured using the given options.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export declare function captureRegex(regexp: RegExp, captureGroup: string): RegExp;

/**
 * Returns RegExp that is properly wrapped in spoilers as indicated by the given options.
 * Convenience for: wrapRegex(regexp, "||||", spoilers)
 */
export declare function spoilerRegex(regexp: RegExp, spoilers: "optional" | true): RegExp;

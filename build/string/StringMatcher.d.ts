import type { Matcher, MatcherResolvable, Optional } from "../index.js";
type StringMatcherToRegExpOptions = {
    /** if set to true then the regex begins with ^ and ends with $; default value is true */
    anchored?: boolean;
    /** if set to true then a * in the value is treated as .*? in the regexp */
    asterisk?: boolean;
    /** if set to "optional" then a whitespace charater in the value is treated as \s* in the regexp */
    whitespace?: "optional";
    /** if set to true then only horizontal whitespace will be made optional */
    horizontalOnly?: boolean;
};
/** If no values are set, all are assumed to be true. */
type CleanOptions = {
    cleanWhitespace?: boolean;
    normalizeApostrophes?: boolean;
    normalizeDashes?: boolean;
    normalizeEllipses?: boolean;
    normalizeQuotes?: boolean;
    removeAccents?: boolean;
    toLowerCase?: boolean;
};
/** A reusable object for comparing a string without the need to repeatedly manipulate the value. */
export declare class StringMatcher implements Matcher {
    constructor(value: Optional<string>, cleanOptions?: CleanOptions);
    /** Stores isNotBlank(value) */
    private _isNonNil?;
    /** Returns isNotBlank(value) */
    get isNonNil(): boolean;
    /** Stores isDefined(value) */
    private _isValid?;
    /** Returns isDefined(value) */
    get isValid(): boolean;
    /** Stores value?.toLowerCase() ?? "" */
    private _lower?;
    get lower(): string;
    /** The value used to compare to other values. */
    private _matchValue?;
    /** The value used to compare to other values. */
    get matchValue(): string;
    cleanOptions?: CleanOptions;
    /** Stores the raw value. */
    value: Optional<string>;
    /** Compares the clean values. */
    matches(other: MatcherResolvable): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny(values: MatcherResolvable[]): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny(...values: MatcherResolvable[]): boolean;
    /** Converts the matchValue into a regular expression. */
    toRegex({ anchored, asterisk, horizontalOnly, whitespace }?: StringMatcherToRegExpOptions): RegExp;
    /** Returns the original value. */
    toString(): Optional<string>;
    /**
     * Cleans the given value to make comparisons more reliable.
     * Convenience for cleanWhitespace(normalizeAscii(removeAccents(String(value ?? "")))).toLowerCase()
     * If options are given, then only those cleaning functions marked as true are used to manipulate the value.
     */
    static clean(value: Optional<string>, options?: CleanOptions): string;
    /** Convenience for StringMatcher.from(value).matches(other) */
    static matches(value: MatcherResolvable, other: MatcherResolvable, options?: CleanOptions): boolean;
    /** Convenience for StringMatcher.from(value).matchesAny(others) */
    static matchesAny(value: MatcherResolvable, others: MatcherResolvable[], options?: CleanOptions): boolean;
    /** Convenience for new StringMatcher(value) */
    static from(value: Optional<MatcherResolvable>, options?: CleanOptions): StringMatcher;
}
export {};

import type { Optional } from "../types/generics.js";
import type { Matcher, MatcherResolvable } from "../types/Matcher.js";
import type { Snowflake } from "./types.js";
/** Convenience type for Snowflake | SnowflakeMatcher */
export type SnowflakeMatcherResolvable = Optional<Snowflake> | SnowflakeMatcher;
/** A reusable object for comparing a UUID without the need to repeatedly manipulate the value. */
export declare class SnowflakeMatcher implements Matcher<Snowflake> {
    constructor(value: Optional<Snowflake>);
    /** Stores isNonNilSnowflake(value) */
    private _isNonNil?;
    /** Returns isNonNilSnowflake(value) */
    get isNonNil(): boolean;
    /** Stores isSnowflake(value) */
    private _isValid?;
    /** Returns isSnowflake(value) */
    get isValid(): boolean;
    /** The value used to compare to other values. */
    private _matchValue?;
    /** The value used to compare to other values. */
    get matchValue(): Snowflake;
    /** Stores the raw value. */
    value: Optional<Snowflake>;
    /** Returns true if the given value is considered a match. */
    matches<T extends MatcherResolvable>(other: T): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny<T extends MatcherResolvable>(values: T[]): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny<T extends MatcherResolvable>(...values: T[]): boolean;
    /** Returns the original value. */
    toString(): Optional<Snowflake>;
    /** Convenience method for new SnowflakeMatcher(value) */
    static from(value: Optional<MatcherResolvable>): SnowflakeMatcher;
}

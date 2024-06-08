import type { Optional } from "../types/generics.js";
import type { Matcher, MatcherResolvable } from "../types/Matcher.js";
import type { UUID } from "./types.js";
/** Convenience type for UUID | UuidMatcher */
export type UuidMatcherResolvable = Optional<UUID> | UuidMatcher;
/** A reusable object for comparing a UUID without the need to repeatedly manipulate the value. */
export declare class UuidMatcher implements Matcher<UUID> {
    constructor(value: Optional<UUID>);
    /** Stores isNonNilUuid(value) */
    private _isNonNil?;
    /** Returns isNonNilUuid(value) */
    get isNonNil(): boolean;
    /** Stores isUuid(value) */
    private _isValid?;
    /** Returns isUuid(value) */
    get isValid(): boolean;
    /** The value used to compare to other values. */
    private _matchValue?;
    /** The value used to compare to other values. */
    get matchValue(): UUID;
    /** Stores the raw value. */
    value: Optional<UUID>;
    /** Returns true if the given value is considered a match. */
    matches<T extends MatcherResolvable>(other: T): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny<T extends MatcherResolvable>(values: T[]): boolean;
    /** Returns true if any of the given values are considered a match. */
    matchesAny<T extends MatcherResolvable>(...values: T[]): boolean;
    /** Returns the original value. */
    toString(): Optional<UUID>;
    /** Convenience method for new UuidMatcher(value) */
    static from(value: Optional<MatcherResolvable>): UuidMatcher;
}

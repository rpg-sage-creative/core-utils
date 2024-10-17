import type { Optional } from "../types/generics.js";
import type { Matcher } from "../types/Matcher.js";
/**
 * Used to create a matcher for an ID.
 * Creates a matcher that always returns false if the given ID isn't a snowflake or uuid.
 */
export declare function getIdMatcher(value: Optional<string>): Matcher;

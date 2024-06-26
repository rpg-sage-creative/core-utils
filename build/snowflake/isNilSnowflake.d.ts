import type { Optional } from "../types/generics.js";
import type { NIL_SNOWFLAKE } from "./types.js";
/**
 * Returns true if the value is a series of at least 16 0s.
 * This accounts for possibly old data that incorrectly assumed a static length of a Snowflake and had a different length for NIL_SNOWFLAKE.
 */
export declare function isNilSnowflake(value: Optional<string>): value is NIL_SNOWFLAKE;

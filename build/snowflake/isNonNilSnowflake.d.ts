import type { Optional } from "../types/generics.js";
import type { Snowflake } from "./types.js";
/** Returns true if the value is a valid non-nil Snowflake. */
export declare function isNonNilSnowflake(value: Optional<Snowflake>): value is Snowflake;

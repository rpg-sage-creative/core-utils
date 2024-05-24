import type { Optional } from "../types/generics.js";
import type { Snowflake } from "./types.js";
/** Returns true if the value is a series of at least 16 numeric digits. */
export declare function isSnowflake(value: Optional<Snowflake>): value is Snowflake;

import type { Optional } from "../types/generics.js";
import { type Snowflake } from "./types.js";
/** Returns the value if it is a valid Snowflake, otherwise it returns NIL_SNOWFLAKE. */
export declare function orNilSnowflake(value: Optional<Snowflake>): Snowflake;

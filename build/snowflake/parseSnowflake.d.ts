import type { Optional } from "../types/generics.js";
import type { Snowflake } from "./types.js";
/** A convenient method for grabbing the first Snowflake present in the string. */
export declare function parseSnowflake(value: Optional<string>): Snowflake | null;

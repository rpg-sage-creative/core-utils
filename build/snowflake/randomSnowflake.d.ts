import type { Snowflake } from "./types.js";
type SnowflakeOptions = {
    timestamp?: bigint | Date | number;
};
/** A convenience method for generating Discord snowflakes and returning them as a string. */
export declare function randomSnowflake(options?: SnowflakeOptions): Snowflake;
export {};

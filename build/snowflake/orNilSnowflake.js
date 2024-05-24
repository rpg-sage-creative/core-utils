import { isNonNilSnowflake } from "./isNonNilSnowflake.js";
import { NIL_SNOWFLAKE } from "./types.js";
export function orNilSnowflake(value) {
    return isNonNilSnowflake(value) ? value : NIL_SNOWFLAKE;
}

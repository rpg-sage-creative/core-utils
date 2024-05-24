/** Constant value that represents a nil Snowflake. */
export declare const NIL_SNOWFLAKE: NIL_SNOWFLAKE;
/** A nil Snowflake has all (16) 0s. */
export type NIL_SNOWFLAKE = Snowflake & {
    nil_snowflake: never;
};
export type Snowflake = string;

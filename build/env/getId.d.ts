import type { Snowflake } from "../snowflake/types.js";
export declare function getId(name: string): Snowflake;
export declare function getId(name: string, ignoreMissing: boolean): Snowflake | undefined;

import { type Snowflake } from "@rsc-utils/id-utils";
export declare function getId(name: string): Snowflake;
export declare function getId(name: string, ignoreMissing: boolean): Snowflake | undefined;

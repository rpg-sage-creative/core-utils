import type { Optional, Snowflake, UUID } from "../index.js";
/** Compresses the given id by converting the numeric values to the given radix (which allows more characters in a given "tens place"). */
export declare function compressId(value: Snowflake | UUID, radix?: number): string;
export declare function compressId(value: Optional<Snowflake | UUID>, radix?: number): string | undefined;

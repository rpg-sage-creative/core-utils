import type { Optional, Snowflake, UUID } from "../index.js";
/** Decompresses the given compressedId of the given radix back into the original value. */
export declare function decompressId<Type extends Snowflake | UUID>(value: string, radix?: number): Type;
export declare function decompressId<Type extends Snowflake | UUID>(value: Optional<string>, radix?: number): Type | undefined;

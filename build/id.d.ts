import type { Snowflake } from "./snowflake/types.js";
import type { Optional } from "./types/generics.js";
import type { UUID } from "./uuid/types.js";
export declare function compressId(value: Snowflake | UUID, radix?: number): string;
export declare function compressId(value: Optional<Snowflake | UUID>, radix?: number): string | undefined;
export declare function decompressId<Type extends Snowflake | UUID>(value: string, radix?: number): Type;
export declare function decompressId<Type extends Snowflake | UUID>(value: Optional<string>, radix?: number): Type | undefined;
export declare function stringToBigInt(value: string, radix: number): bigint;

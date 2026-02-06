import type { Optional, Snowflake, UUID } from "../index.js";
import { decompressId } from "./decompressId.js";

/** Compresses the given id by converting the numeric values to the given radix (which allows more characters in a given "tens place"). */
export function compressId(value: Snowflake | UUID, radix?: number): string;
export function compressId(value: Optional<Snowflake | UUID>, radix?: number): string | undefined;
export function compressId(value: Optional<Snowflake | UUID>, radix = 36): string | undefined {
	if (value) {
		if (value.includes("-")) {
			return value.split("-").map(s => compressId(decompressId(s, 16), radix)).join("-");
		}
		return BigInt(value).toString(radix);
	}
	return undefined;
}
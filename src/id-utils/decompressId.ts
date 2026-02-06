import type { Optional, Snowflake, UUID } from "../index.js";
import { compressId } from "./compressId.js";
import { stringToBigInt } from "./internal/stringToBigInt.js";

/** Decompresses the given compressedId of the given radix back into the original value. */
export function decompressId<Type extends Snowflake | UUID>(value: string, radix?: number): Type;
export function decompressId<Type extends Snowflake | UUID>(value: Optional<string>, radix?: number): Type | undefined;
export function decompressId<Type extends Snowflake | UUID>(value: Optional<string>, radix = 36): Type | undefined {
	if (value) {
		if (value.includes("-")) {
			const lengths = [8, 4, 4, 4, 12];
			return value.split("-").map((s, i) => compressId(decompressId(s, radix), 16).padStart(lengths[i] ?? 0, "0")).join("-") as Type;
		}else {
			return value === "0"
				? "0".padEnd(16, "0") as Type
				: stringToBigInt(value, radix).toString() as Type
		}
	}
	return undefined;
}


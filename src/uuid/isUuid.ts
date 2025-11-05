import type { Optional } from "../types/generics.js";
import { parseUuid } from "./parseUuid.js";
import type { UUID } from "./types.js";

/** Returns true if a valid UUID string (regardless of case), or false otherwise. */
export function isUuid(value: Optional<string>): value is UUID {
	if (!value) return false;
	return parseUuid(value) === value;
}

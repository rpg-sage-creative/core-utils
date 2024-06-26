import type { Optional } from "../types/generics.js";
import { isUuid } from "./isUuid.js";
import { NIL_UUID, type UUID } from "./types.js";

/** Returns a normalized UUID (lowerCase) if it is a valid UUID, otherwise it returns NIL_UUID. */
export function orNilUuid(value: Optional<string>): UUID {
	return isUuid(value) ? value.toLowerCase() as UUID : NIL_UUID;
}

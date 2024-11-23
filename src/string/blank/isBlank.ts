import type { Optional } from "../../types/generics.js";

/** Returns true if null, undefined, or only whitespace. */
export function isBlank(text: Optional<string>): text is null | undefined | "" {
	return !text?.trim().length;
}

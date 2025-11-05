import type { Optional } from "../types/generics.js";
import type { UUID } from "./types.js";
import { UuidRegExp } from "./UuidRegExp.js";

/** A convenient method for grabbing the first UUID present in the string. */
export function parseUuid(value: Optional<string>): UUID | undefined {
	if (!value) return undefined;
	return UuidRegExp.exec(value ?? "")?.groups?.uuid;
}
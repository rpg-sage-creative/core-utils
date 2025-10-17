import type { Optional } from "../../types/generics.js";
import { QuotedContentRegExp } from "./QuotedContentRegExp.js";

type QuotedString = `"${string}"` | `“${string}”` | `'${string}'` | `‘${string}’`;

/** Returns true if the value is properly quoted, false otherwise. */
export function isQuoted(value: Optional<string>): value is QuotedString {
	if (!value) return false;
	const match = QuotedContentRegExp.exec(value);
	return match?.index === 0 && match[0].length === value.length;
}

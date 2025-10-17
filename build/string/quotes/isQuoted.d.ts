import type { Optional } from "../../types/generics.js";
type QuotedString = `"${string}"` | `“${string}”` | `'${string}'` | `‘${string}’`;
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isQuoted(value: Optional<string>): value is QuotedString;
export {};

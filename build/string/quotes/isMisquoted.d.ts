import type { Optional } from "@rsc-utils/type-utils";
type MisquotedString = `"${string}“` | `"${string}”` | `“${string}"` | `“${string}“` | `”${string}"` | `”${string}“` | `”${string}”` | `'${string}‘` | `'${string}’` | `‘${string}'` | `‘${string}‘` | `’${string}'` | `’${string}‘` | `’${string}’`;
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isMisquoted(value: Optional<string>): value is MisquotedString;
export {};

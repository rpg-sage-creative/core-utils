import type { Optional } from "@rsc-utils/type-utils";
type QuotedString = `"${string}"` | `“${string}”` | `'${string}'` | `‘${string}’`;
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isQuoted(value: Optional<string>): value is QuotedString;
export {};

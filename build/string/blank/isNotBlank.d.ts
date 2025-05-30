import type { Optional } from "../../types/generics.js";
/** Returns true if not null and not undefined and not only whitespace. */
export declare function isNotBlank(value: Optional<string>): value is string;

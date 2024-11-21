import type { Optional } from "../../types/generics.js";
/** Returns true if not null and not undefined and not only whitespace. */
export declare function isNotBlank(text: Optional<string>): text is string;

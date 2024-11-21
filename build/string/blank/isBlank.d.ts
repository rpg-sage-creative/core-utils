import type { Optional } from "../../types/generics.js";
/** Returns true if null, undefined, or only whitespace. */
export declare function isBlank(text: Optional<string>): text is null | undefined | "";

import type { Optional } from "../../types/generics.js";
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isQuotedOrMisquoted(value: Optional<string>): "quoted" | "misquoted" | false;

import type { Optional } from "@rsc-utils/type-utils";
/** Returns true if the value is properly quoted, false otherwise. */
export declare function isQuotedOrMisquoted(value: Optional<string>): "quoted" | "misquoted" | false;

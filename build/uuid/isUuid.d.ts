import type { Optional } from "../types/generics.js";
import type { UUID } from "./types.js";
/** Returns true if a valid UUID string (regardless of case), or false otherwise. */
export declare function isUuid(value: Optional<string>): value is UUID;

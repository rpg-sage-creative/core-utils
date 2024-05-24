import type { Optional } from "../types/generics.js";
import { type UUID } from "./types.js";
/** Returns true if the value is a nil UUID. */
export declare function isNonNilUuid(value: Optional<UUID>): value is UUID;

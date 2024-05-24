import type { Optional } from "../types/generics.js";
import { type UUID } from "./types.js";
/** Returns a normalized UUID if it is a valid UUID, otherwise it returns NIL_UUID. */
export declare function orNilUuid(value: Optional<UUID>): UUID;

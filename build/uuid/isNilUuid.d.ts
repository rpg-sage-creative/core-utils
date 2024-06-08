import type { Optional } from "../types/generics.js";
import { NIL_UUID } from "./types.js";
/** Returns true if the value is a nil UUID. */
export declare function isNilUuid(value: Optional<string>): value is NIL_UUID;

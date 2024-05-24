import { isUuid } from "./isUuid.js";
import { NIL_UUID } from "./types.js";
export function orNilUuid(value) {
    return isUuid(value) ? value.toLowerCase() : NIL_UUID;
}

import { isNilUuid } from "./isNilUuid.js";
import { isUuid } from "./isUuid.js";
import {} from "./types.js";
export function isNonNilUuid(value) {
    return isUuid(value) && !isNilUuid(value);
}

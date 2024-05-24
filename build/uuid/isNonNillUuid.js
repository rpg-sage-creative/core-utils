import { isNilUuid } from "./isNilUuid.js";
import { isUuid } from "./isUuid.js";
export function isNonNilUuid(value) {
    return isUuid(value) && !isNilUuid(value);
}

import { parseUuid } from "./parseUuid.js";
export function isUuid(value) {
    if (!value)
        return false;
    return parseUuid(value) === value;
}

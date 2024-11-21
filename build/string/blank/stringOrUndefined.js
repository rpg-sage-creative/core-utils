import { isBlank } from "./isBlank.js";
export function stringOrUndefined(value) {
    return isBlank(value) ? undefined : value;
}

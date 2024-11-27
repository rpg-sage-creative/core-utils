import { ELLIPSIS } from "./consts.js";
export function truncate(value, maxLength, ellipsis) {
    if (value && value.length > maxLength) {
        const suffix = ellipsis === true ? ELLIPSIS : ellipsis ?? "";
        const sliced = value.slice(0, maxLength - suffix.length);
        return sliced + suffix;
    }
    return value;
}

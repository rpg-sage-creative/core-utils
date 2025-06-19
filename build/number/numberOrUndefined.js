import { getNumberRegex } from "./getNumberRegex.js";
export function numberOrUndefined(value) {
    if (value === null || value === undefined)
        return undefined;
    if (getNumberRegex({ anchored: true }).test(value))
        return +value;
    return undefined;
}

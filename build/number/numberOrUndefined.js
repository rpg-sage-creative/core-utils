import { isFiniteNumber } from "../types/index.js";
import { getNumberRegex } from "./getNumberRegex.js";
export function numberOrUndefined(value) {
    if (value === null || value === undefined)
        return undefined;
    if (isFiniteNumber(value))
        return value;
    if (getNumberRegex({ anchored: true }).test(value))
        return +value;
    return undefined;
}

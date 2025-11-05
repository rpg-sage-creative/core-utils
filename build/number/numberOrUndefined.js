import { isFiniteNumber } from "../types/index.js";
import { isNumberString } from "./isNumberString.js";
export function numberOrUndefined(value) {
    if (value === null || value === undefined)
        return undefined;
    if (isFiniteNumber(value))
        return value;
    if (isNumberString(value))
        return +value;
    return undefined;
}

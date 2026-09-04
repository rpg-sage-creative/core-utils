import { isFiniteNumber } from "@rsc-utils/type-utils";
import { isNumberString } from "./isNumberString.js";
/** Returns the value cast as a number or undefined if the value does not represent a number. */
export function numberOrUndefined(value) {
    if (value === null || value === undefined)
        return undefined;
    if (isFiniteNumber(value))
        return value;
    if (isNumberString(value))
        return +value;
    return undefined;
}

import { getDaysPerMonth } from "./getDaysPerMonth.js";
/** Returns the number of days in the given month. */
export function getDaysInMonth(month) {
    return getDaysPerMonth()[month];
}

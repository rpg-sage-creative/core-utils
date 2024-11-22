import { Month } from "./Month.js";
export function getMonthNames() {
    return Object.keys(Month)
        .filter(key => typeof (Month[key]) === "number");
}

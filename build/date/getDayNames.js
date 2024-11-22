import { Day } from "./Day.js";
export function getDayNames() {
    return Object.keys(Day)
        .filter(key => typeof (Day[key]) === "number");
}

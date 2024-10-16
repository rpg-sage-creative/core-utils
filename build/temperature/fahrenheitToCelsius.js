import { round } from "../number/round.js";
export function fahrenheitToCelsius(degreesF, precision = 0) {
    const degreesC = (degreesF - 32) * 5 / 9;
    if (precision !== undefined) {
        return round(degreesC, precision);
    }
    return degreesC;
}

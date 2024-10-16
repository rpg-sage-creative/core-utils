import { round } from "../number/round.js";
export function celsiusToFahrenheit(degreesC, precision = 0) {
    const degreesF = degreesC * 9 / 5 + 32;
    if (precision !== undefined) {
        return round(degreesF, precision);
    }
    return degreesF;
}

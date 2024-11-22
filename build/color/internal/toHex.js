import { round } from "../../number/round.js";
export function alphaToHex(value = 1) {
    if (value < 0) {
        value = 0;
    }
    else if (value > 1) {
        value = 1;
    }
    return numberToHex(value * 255);
}
export function numberToHex(value) {
    if (value < 0) {
        value = 0;
    }
    else if (value > 255) {
        value = 255;
    }
    return round(value, 0).toString(16).padStart(2, "0");
}

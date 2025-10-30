import { round } from "../../number/round.js";
export function alphaToHex(value = 1) {
    const bounded = Math.max(0, Math.min(value, 1));
    return numberToHex(bounded * 255);
}
export function numberToHex(value) {
    const rounded = round(value, 0);
    const bounded = Math.max(0, Math.min(rounded, 255));
    return bounded.toString(16).padStart(2, "0");
}

import { round } from "../../number/round.js";
export function hexToAlpha(value) {
    return round(parseInt(value, 16) / 255, 2);
}

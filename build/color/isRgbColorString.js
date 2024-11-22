import { matchRgb } from "./internal/matchRgb.js";
export function isRgbColorString(color, withAlpha) {
    const match = matchRgb(color);
    if (!match)
        return false;
    if (withAlpha === true) {
        return match.alpha !== undefined;
    }
    else if (withAlpha === false) {
        return match.alpha === undefined;
    }
    return true;
}

import { matchHex } from "./internal/matchHex.js";
export function isHexColorString(color, withAlpha) {
    const match = matchHex(color);
    if (!match)
        return false;
    if (withAlpha === true) {
        return match.hasAlpha;
    }
    else if (withAlpha === false) {
        return !match.hasAlpha;
    }
    return true;
}

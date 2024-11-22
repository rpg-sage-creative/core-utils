import { round } from "../number/round.js";
import { matchRgb } from "./internal/matchRgb.js";
export function parseRgbColor(value, includeAlpha) {
    const match = matchRgb(value);
    if (!match)
        return undefined;
    const { red, green, blue, alpha } = match;
    if (includeAlpha === false) {
        return { red, green, blue };
    }
    const roundedAlpha = alpha !== undefined ? round(alpha, 2) : undefined;
    if (includeAlpha === true) {
        return { red, green, blue, alpha: roundedAlpha ?? 1 };
    }
    return { red, green, blue, alpha: roundedAlpha };
}

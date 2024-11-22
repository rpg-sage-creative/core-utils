import { matchHex } from "./internal/matchHex.js";
export function parseHexColor(value, includeAlpha) {
    const match = matchHex(value);
    if (!match)
        return undefined;
    let hex = match.digits.toLowerCase();
    if (hex.length < 5) {
        hex = [...hex].map(d => d + d).join("");
    }
    if (includeAlpha === true) {
        hex = hex.padEnd(8, "f");
    }
    else if (includeAlpha === false) {
        hex = hex.slice(0, 6);
    }
    return `#${hex}`;
}

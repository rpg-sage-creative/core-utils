import { isHexColorString } from "../isHexColorString.js";
import { isRgbColorString } from "../isRgbColorString.js";
import { getNamedColor } from "../namedColors.js";
import { hexToColor } from "./hexToColor.js";
import { rgbToHex } from "./rgbToHex.js";
export function toColorData(colorOrRed, alphaOrGreen, blue, alpha) {
    if (typeof (colorOrRed) === "number") {
        if (alpha !== undefined) {
            return hexToColor(rgbToHex(colorOrRed, alphaOrGreen, blue, alpha));
        }
        else {
            return hexToColor(rgbToHex(colorOrRed, alphaOrGreen, blue));
        }
    }
    else if (typeof (colorOrRed) === "object") {
        return hexToColor(colorOrRed.hexa, alphaOrGreen);
    }
    const namedColor = getNamedColor(colorOrRed?.toLowerCase());
    if (namedColor) {
        return hexToColor(namedColor.hexa, alphaOrGreen);
    }
    if (isHexColorString(colorOrRed)) {
        return hexToColor(colorOrRed, alphaOrGreen);
    }
    if (isRgbColorString(colorOrRed)) {
        return hexToColor(rgbToHex(colorOrRed), alphaOrGreen);
    }
    return undefined;
}

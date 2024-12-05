import { getNamedColor } from "../namedColors.js";
import { parseHexColor } from "../parseHexColor.js";
import { hexToAlpha } from "./hexToAlpha.js";
import { alphaToHex } from "./toHex.js";
export function hexToColor(value, newAlpha) {
    let hexa = parseHexColor(value);
    if (!hexa) {
        return undefined;
    }
    hexa = hexa.padEnd(9, "f");
    const hex = hexa.slice(0, 7);
    if (newAlpha !== undefined) {
        hexa = hex + alphaToHex(newAlpha);
    }
    const color = getNamedColor(hexa);
    if (color) {
        return color.data;
    }
    const alpha = hexToAlpha(hexa.slice(-2));
    const red = parseInt(hexa.slice(1, 3), 16), green = parseInt(hexa.slice(3, 5), 16), blue = parseInt(hexa.slice(5, 7), 16);
    return {
        names: [],
        hexa,
        hex,
        rgba: `rgba(${red},${green},${blue},${alpha})`,
        rgb: `rgb(${red},${green},${blue})`,
        red,
        green,
        blue,
        alpha
    };
}

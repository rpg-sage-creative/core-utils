import { parseRgbColor } from "../parseRgbColor.js";
import { alphaToHex, numberToHex } from "./toHex.js";
function rgbaToHexa(red, green, blue, alpha) {
    return `#${numberToHex(red)}${numberToHex(green)}${numberToHex(blue)}${alphaToHex(alpha)}`;
}
export function rgbToHex(rgbaOrRed, alphaOrGreen, blue, alpha) {
    if (typeof (rgbaOrRed) === "number") {
        const hexa = rgbaToHexa(rgbaOrRed, alphaOrGreen, blue, alpha);
        return alpha === undefined
            ? hexa.slice(0, 7)
            : hexa;
    }
    const rgb = parseRgbColor(rgbaOrRed);
    if (rgb) {
        const hexa = rgbaToHexa(rgb.red, rgb.green, rgb.blue, alphaOrGreen ?? rgb.alpha);
        return (alphaOrGreen ?? rgb.alpha) === undefined
            ? hexa.slice(0, 7)
            : hexa;
    }
    return undefined;
}

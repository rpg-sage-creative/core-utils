import { hexToColor } from "./internal/hexToColor.js";
import { toColorData } from "./internal/toColorData.js";
import { isHexColorString } from "./isHexColorString.js";
import { isRgbColorString } from "./isRgbColorString.js";
import { hasNamedColor } from "./namedColors.js";
export class Color {
    data;
    get names() { return this.data.names; }
    get hex() { return this.data.hex; }
    get hexa() { return this.data.hexa; }
    get rgb() { return this.data.rgb; }
    get rgba() { return this.data.rgba; }
    get red() { return this.data.red; }
    get green() { return this.data.green; }
    get blue() { return this.data.blue; }
    get alpha() { return this.data.alpha; }
    constructor(data) {
        this.data = data;
    }
    toDiscordColor() { return "0x" + this.hex.slice(1); }
    darken(increment = 16) {
        const red = Math.max(0, this.red - increment), green = Math.max(0, this.green - increment), blue = Math.max(0, this.blue - increment);
        return Color.from(red, green, blue, this.alpha);
    }
    lighten(increment = 16) {
        const red = Math.min(255, this.red + increment), green = Math.min(255, this.green + increment), blue = Math.min(255, this.blue + increment);
        return Color.from(red, green, blue, this.alpha);
    }
    tweakAlpha(multiplier) {
        return new Color(hexToColor(this.data.hexa, this.alpha * multiplier));
    }
    static from(colorOrRed, alphaOrGreen, blue, alpha) {
        const color = toColorData(colorOrRed, alphaOrGreen, blue, alpha);
        return color ? new Color(color) : undefined;
    }
    static isValid(color) {
        return isHexColorString(color) || isRgbColorString(color);
    }
    static isName(color) {
        return hasNamedColor(color?.toLowerCase());
    }
}

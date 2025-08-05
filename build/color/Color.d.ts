import type { Optional } from "../types/generics.js";
import type { ColorData, ColorString, HexColorString, RgbaColorString, RgbColorString } from "./ColorData.js";
export declare class Color {
    data: ColorData;
    get names(): string[];
    get hex(): HexColorString;
    get hexa(): HexColorString;
    get rgb(): RgbColorString;
    get rgba(): RgbaColorString;
    get red(): number;
    get green(): number;
    get blue(): number;
    get alpha(): number;
    constructor(data: ColorData);
    /** @deprecated Returns a color value compatible with Discord. */
    toDiscordColor(): string;
    /** Creates a new Color object that is darker. */
    darken(): Color;
    /** Creates a new Color object that is darker by subtracting the given increment from each color. */
    darken(increment: number): Color;
    /** Creates a new Color object that is lighter. */
    lighten(): Color;
    /** Creates a new Color object that is lighter by adding the given increment to each color. */
    lighten(increment: number): Color;
    /** Creates a new Color object with the alpha value multiplied by the given multiplier. */
    tweakAlpha(multiplier: number): Color;
    static from(color: Optional<string>): Color | undefined;
    static from(color: ColorString, alpha: number): Color;
    static from(red: number, green: number, blue: number): Color;
    static from(red: number, green: number, blue: number, alpha: number): Color;
    /** Tests all color types in this module */
    static isValid(color: Optional<string>): color is ColorString;
    /** Tests to see if the named color exists */
    static isName(color: Optional<string>): boolean;
}

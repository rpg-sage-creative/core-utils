import type { HexColorString, RgbString } from "../ColorData.js";
export declare function rgbToHex(rgba: RgbString): HexColorString;
export declare function rgbToHex(rgba: RgbString, newAlpha: number): HexColorString;
export declare function rgbToHex(red: number, green: number, blue: number): HexColorString;
export declare function rgbToHex(red: number, green: number, blue: number, alpha: number): HexColorString;

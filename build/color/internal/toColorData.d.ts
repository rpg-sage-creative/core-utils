import type { ColorData } from "../ColorData.js";
/** Converts any given values to Hex and then to a Color object */
export declare function toColorData(color: string): ColorData;
export declare function toColorData(color: string, alpha: number): ColorData;
export declare function toColorData(color: ColorData, alpha: number): ColorData;
export declare function toColorData(red: number, green: number, blue: number): ColorData;
export declare function toColorData(red: number, green: number, blue: number, alpha: number): ColorData;

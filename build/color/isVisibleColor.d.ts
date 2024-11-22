import type { Optional } from "../types/generics.js";
import type { HexColorString, RgbaColorString, RgbColorString } from "./ColorData.js";
type ColorString = HexColorString | RgbColorString | RgbaColorString;
export declare function isVisibleColor(color: Optional<ColorString>): boolean;
export {};

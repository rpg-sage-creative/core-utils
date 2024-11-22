import type { Optional } from "../types/generics.js";
import type { RgbaColorString, RgbColorString } from "./ColorData.js";
/** Tests for RGB or RGBA */
export declare function isRgbColorString(color: Optional<string>): color is RgbColorString | RgbaColorString;
/** Tests explicitly for RGBA (WITH alpha) */
export declare function isRgbColorString(color: Optional<string>, withAlpha: true): color is RgbaColorString;
/** Tests explicitly for RGB (WITHOUT alpha) */
export declare function isRgbColorString(color: Optional<string>, withAlpha: false): color is RgbColorString;

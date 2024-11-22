import { type ColorData, type HexColorString } from "../ColorData.js";
/** Converts a hex/hexa value (with optional new alpha) to a Color object */
export declare function hexToColor(value: HexColorString, newAlpha?: number): ColorData | undefined;

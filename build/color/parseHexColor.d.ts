import type { Optional } from "../types/generics.js";
import type { HexColorString } from "./ColorData.js";
/** Parses the value to get a Hex value, include alpha if present: #002244FF */
export declare function parseHexColor(value: Optional<string>): HexColorString | undefined;
/** Parses the value to get a full Hex value with alpha: #002244FF */
export declare function parseHexColor(value: Optional<string>, includeAlpha: true): HexColorString | undefined;
/** Parses the value to get a Hex value with NO alpha: #002244 */
export declare function parseHexColor(value: Optional<string>, includeAlpha: false): HexColorString | undefined;

import type { Optional } from "../types/generics.js";
/** Simple type to store r/g/b values */
type RGB = {
    red: number;
    green: number;
    blue: number;
};
/** Simple type to store r/g/b/a values */
type RGBA = {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
};
/** Parses the value to get all the r/g/b/a component values, alpha only if present. */
export declare function parseRgbColor(value: Optional<string>): RGBA | undefined;
/** Parses the value to get all the r/g/b/a component values. */
export declare function parseRgbColor(value: Optional<string>, includeAlpha: true): RGBA | undefined;
/** Parses the value to get all the r/g/b component values. */
export declare function parseRgbColor(value: Optional<string>, includeAlpha: false): RGB | undefined;
export {};

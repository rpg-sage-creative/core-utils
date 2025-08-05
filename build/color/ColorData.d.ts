export type HexColorString = `#${string}`;
export type RgbColorString = `rgb(${number},${number},${number})`;
export type RgbaColorString = `rgba(${number},${number},${number},${number})`;
export type ColorString = HexColorString | RgbColorString | RgbaColorString;
/** Stores all the information we know about a color */
export type ColorData = {
    names: string[];
    hex: HexColorString;
    hexa: HexColorString;
    rgb: RgbColorString;
    rgba: RgbaColorString;
    red: number;
    green: number;
    blue: number;
    alpha: number;
};

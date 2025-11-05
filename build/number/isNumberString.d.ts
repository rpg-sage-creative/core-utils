import type { Optional } from "../types/generics.js";
/** /[\-\+]?\d+(?:\.\d+)?/ */
export declare const NumberRegExp: RegExp;
type NumberString = `${"-" | "+" | ""}${number}`;
export declare function isNumberString(value: Optional<string>): value is NumberString;
export {};

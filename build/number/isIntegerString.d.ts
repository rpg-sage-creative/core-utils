import type { Optional } from "../types/generics.js";
/** /[\-\+]?\d+(?:\.\d+)?/ */
export declare const IntegerStringRegExp: RegExp;
type IntegerString = `${"-" | "+" | ""}${number}`;
export declare function isIntegerString(value: Optional<string>): value is IntegerString;
export {};

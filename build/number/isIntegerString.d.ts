import type { Optional } from "../types/generics.js";
/** /[\-+]?\d+/ */
export declare const IntegerRegExp: RegExp;
type IntegerString = `${"-" | "+" | ""}${number}`;
export declare function isIntegerString(value: Optional<string>): value is IntegerString;
export {};

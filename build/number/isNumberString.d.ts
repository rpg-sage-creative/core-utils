import type { Optional } from "@rsc-utils/type-utils";
/** /[\-\+]?\d+(?:\.\d+)?/ */
export declare const NumberRegExp: RegExp;
type NumberString = `${"-" | "+" | ""}${number}`;
export declare function isNumberString(value: Optional<string>): value is NumberString;
export {};

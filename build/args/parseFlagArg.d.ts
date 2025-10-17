import type { Optional } from "../types/generics.js";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import type { FlagArg } from "./types.js";
type FlagArgMatchGroups = {
    key: string;
};
export declare const FlagArgRegExp: TypedRegExp<FlagArgMatchGroups>;
export declare function parseFlagArg<KeyType extends string = string>(raw: Optional<string>, index?: number): FlagArg<KeyType> | undefined;
export {};

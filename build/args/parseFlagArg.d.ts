import type { Optional, TypedRegExp } from "@rsc-utils/type-utils";
import type { FlagArg } from "./types.js";
type FlagArgMatchGroups = {
    key: string;
};
export declare const FlagArgRegExp: TypedRegExp<FlagArgMatchGroups>;
export declare function parseFlagArg<KeyType extends string = string>(raw: Optional<string>, index?: number): FlagArg<KeyType> | undefined;
export {};

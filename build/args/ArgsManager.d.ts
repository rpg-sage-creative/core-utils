import { type TokenParsers } from "../string/index.js";
import type { EnumLike, OrUndefined } from "../types/generics.js";
import type { FlagArg, IncrementArg, KeyValueArg, ValueArg } from "./types.js";
type Arg<T extends string, U extends string> = FlagArg<T> | IncrementArg<T, U> | KeyValueArg<T, U> | ValueArg<T>;
export declare class ArgsManager<T extends string = string> {
    private _args;
    private _flagArgs?;
    private _incrementArgs?;
    private _keyValueArgs?;
    private _strings;
    private _valueArgs?;
    constructor(raw?: string[]);
    /** Returns the count of defined Args. This may differ from the count of the original (raw) string array. */
    get length(): number;
    /** Returns an array of all the Args. */
    args(): Arg<T, string>[];
    /** Sends all ValueArgs to parseEnum and returns only valid (defined) results. */
    enumValues<K extends string = string, V extends number = number>(enumLike: EnumLike<K, V>): V[];
    /** Returns KeyValueArg for the first key found. */
    findKeyValueArg<U extends string = string>(key: Lowercase<string>, ...additionalKeys: Lowercase<string>[]): OrUndefined<KeyValueArg<T, U>>;
    /** Returns all FlagArg (.isFlag === true). */
    flagArgs(): FlagArg<T>[];
    /** Returns true if a flag is found that has any of the given keys. Flag keys are the flag with the first 1 or 2 dashes removed. */
    hasFlag(key: Lowercase<string>, ...additionalKeys: Lowercase<string>[]): boolean;
    /** Returns all IncrementArg (.isIncrement === true), optionally filtering by the given keys. */
    incrementArgs<U extends string = string>(...keys: Lowercase<string>[]): IncrementArg<T, U>[];
    /** Returns all KeyValueArg (.isKeyValue === true), optionally filtering by the given keys. */
    keyValueArgs<U extends string = string>(...keys: Lowercase<string>[]): KeyValueArg<T, U>[];
    /** Returns the original (raw) string array. */
    raw(): string[];
    /** Returns all ValueArg (.isValue === true). */
    valueArgs(): ValueArg<T>[];
    /** Splits the given value into arguments by tokenizing it and then creating an ArgsManager from the resulting array. */
    static from<T extends string = string>(value: string, additionalParsers?: TokenParsers): ArgsManager<T>;
    /** Creates an ArgsManager with a copy of the given values. */
    static from<T extends string = string>(values: ArrayLike<string> | Iterable<string>): ArgsManager<T>;
    /** Creates a copy of the given ArgsManager. */
    static from<T extends string = string>(other: ArgsManager<T>): ArgsManager<T>;
}
export {};

import Collection from "../array/Collection.js";
import type { OrUndefined } from "../types/generics.js";
type FlagArg<T extends string> = {
    /** raw arg text */
    arg: T;
    /** index of the arg in the args array */
    index: number;
    /** does the arg start with a dash? */
    isFlag: true;
    /** is the arg key+= or key-= or key++ or key-- */
    isIncrement?: never;
    /** is the arg a value key/value pair? */
    isKeyValue?: never;
    /** is the arg a raw value arg */
    isValue?: never;
    /** key for the flag or pair */
    key: string;
    /** key.toLowerCase() */
    keyLower: string;
    /** how to increment/decrement */
    modifier?: never;
    /** arg for ValueData, value for a PairData; null for pair with empty string, undefined for a flag */
    value?: never;
};
type IncrementArg<T extends string, U extends string> = {
    /** raw arg text */
    arg: T;
    /** index of the arg in the args array */
    index: number;
    /** does the arg start with a dash? */
    isFlag?: never;
    /** is the arg key+= or key-= or key++ or key-- */
    isIncrement: true;
    /** is the arg a value key/value pair? */
    isKeyValue?: never;
    /** is the arg a raw value arg */
    isValue?: never;
    /** key for the flag or pair */
    key: string;
    /** key.toLowerCase() */
    keyLower: string;
    /** how to increment/decrement */
    operator: "+" | "-";
    /** arg for ValueData, value for a PairData; null for pair with empty string, undefined for a flag */
    value: U | null;
};
type KeyValueArg<T extends string, U extends string> = {
    /** raw arg text */
    arg: T;
    /** index of the arg in the args array */
    index: number;
    /** does the arg start with a dash? */
    isFlag?: never;
    /** is the arg key+= or key-= or key++ or key-- */
    isIncrement?: never;
    /** is the arg a value key/value pair? */
    isKeyValue?: true;
    /** is the arg a raw value arg */
    isValue?: never;
    /** key for the flag or pair */
    key: string;
    /** key.toLowerCase() */
    keyLower: string;
    /** how to increment/decrement */
    modifier?: never;
    /** arg for ValueData, value for a PairData; null for pair with empty string, undefined for a flag */
    value: U | null;
};
type ValueArg<T extends string> = {
    /** raw arg text */
    arg: T;
    /** index of the arg in the args array */
    index: number;
    /** does the arg start with a dash? */
    isFlag?: never;
    /** is the arg key+= or key-= or key++ or key-- */
    isIncrement?: never;
    /** is the arg a value key/value pair? */
    isKeyValue?: never;
    /** is the arg a raw value arg */
    isValue?: true;
    /** key for the flag or pair */
    key?: never;
    /** key.toLowerCase() */
    keyLower?: never;
    /** how to increment/decrement */
    modifier?: never;
    /** arg for ValueData, value for a PairData; null for pair with empty string, undefined for a flag */
    value: T | null;
};
type Arg<T extends string, U extends string> = FlagArg<T> | IncrementArg<T, U> | KeyValueArg<T, U> | ValueArg<T>;
type MappedArg<T extends string, U extends string, V> = Arg<T, U> & {
    mappedValue: V | null;
};
export declare class ArgsManager<T extends string> extends Collection<T> {
    constructor();
    constructor(arrayLength: number);
    constructor(...items: T[]);
    initialArgs: T[];
    /** Maps each arg to an ArgData appropriate for the arg value. */
    parseArgs<U extends string = string>(): OrUndefined<Arg<T, U>>[];
    /** Returns PairData for the given key. */
    findKeyValueArg<U extends string = string>(key: string): OrUndefined<KeyValueArg<T, U>>;
    /** Returns all PairData from .parseArgs() where .isPair is true. */
    keyValueArgs<U extends string = string>(): Collection<KeyValueArg<T, U>>;
    /** Returns all PairData from .parseArgs() where .isIncrement is true. */
    incrementArgs<U extends string = string>(): Collection<IncrementArg<T, U>>;
    /** Returns all PairData from .parseArgs() where .isFlag is true. */
    flagArgs(): Collection<FlagArg<T>>;
    /** Returns all PairData from .parseArgs() where .isValue is true. */
    valueArgs(): Collection<ValueArg<T>>;
    /**
     * Calls the given predicate for each arg that successfully parses to an ArgData object.
     * The first arg to return a defined value is returned with that value as .ret.
     * Undefined if arg not found.
     */
    findMap<U extends string = string, V = any>(predicate: (value: Arg<T, U>, index: number, obj: T[]) => unknown, thisArg?: any): OrUndefined<MappedArg<T, U, V>>;
}
export {};

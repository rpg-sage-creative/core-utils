import Collection from "../array/Collection.js";
import type { OrUndefined } from "../types/generics.js";
import type { FlagArg, IncrementArg, KeyValueArg, ValueArg } from "./types.js";
type Arg<T extends string, U extends string> = FlagArg<T> | IncrementArg<T, U> | KeyValueArg<T, U> | ValueArg<T>;
type MappedArg<T extends string, U extends string, V> = Arg<T, U> & {
    mappedValue: V | null;
};
export declare class ArgsManager<T extends string> extends Collection<T> {
    constructor();
    constructor(arrayLength: number);
    constructor(...items: T[]);
    initialArgs: T[];
    /** Maps each arg to an Arg type appropriate for the arg value. */
    parseArgs<U extends string = string>(): OrUndefined<Arg<T, U>>[];
    /** Returns KeyValueArg for the given key. */
    findKeyValueArg<U extends string = string>(key: string): OrUndefined<KeyValueArg<T, U>>;
    /** Returns all KeyValueArg from .parseArgs() where .isKeyValue is true. */
    keyValueArgs<U extends string = string>(): Collection<KeyValueArg<T, U>>;
    /** Returns all IncrementArg from .parseArgs() where .isIncrement is true. */
    incrementArgs<U extends string = string>(): Collection<IncrementArg<T, U>>;
    /** Returns all FlagArg from .parseArgs() where .isFlag is true. */
    flagArgs(): Collection<FlagArg<T>>;
    /** Returns all ValueArg from .parseArgs() where .isValue is true. */
    valueArgs(): Collection<ValueArg<T>>;
    /**
     * Calls the given predicate for each arg that successfully parses to an ArgData object.
     * The first arg to return a defined value is returned with that value as .ret.
     * Undefined if arg not found.
     */
    findMap<U extends string = string, V = any>(predicate: (value: Arg<T, U>, index: number, obj: T[]) => unknown, thisArg?: any): OrUndefined<MappedArg<T, U, V>>;
}
export {};

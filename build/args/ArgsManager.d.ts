import Collection from "../array/Collection.js";
import type { OrUndefined } from "../types/generics.js";
import type { KeyValueArg } from "./KeyValueArg.js";
type TArgIndexRet<T> = {
    arg: string;
    index: number;
    ret: T | null;
};
/** Represents an argument that was 'key=value'. If value is an empty string, it will be set as NULL. */
type TKeyValuePair<T extends string = string> = {
    /** The value on the left of the first equals sign. */
    key: string;
    /** This value is null if they value was an empty string. */
    value: T | null;
};
/** Used to enable simpler removal of key value pairs from the ArgsManager. */
type TKeyValueIndex<T extends string = string> = TKeyValuePair<T> & {
    index: number;
};
export declare class ArgsManager<T extends string> extends Collection<T> {
    constructor();
    constructor(arrayLength: number);
    constructor(...items: T[]);
    initialArgs: T[];
    /** Maps each value to a key/value pair or null if the value isn't a key/value pair. */
    protected parseKeyValuePairs<U extends string = string>(): OrUndefined<TKeyValueIndex<U>>[];
    /** Returns all values that are key/value pairs, as a key/value pair. */
    keyValuePairs<U extends string = string, V extends TKeyValuePair<U> = TKeyValuePair<U>>(): V[];
    /**  */
    protected findKeyValueArgIndex(key: string): OrUndefined<TArgIndexRet<KeyValueArg>>;
    /** Returns all value/index pairs that are not key/value "arg" pairs. */
    protected findArgIndexNonArgs(): TArgIndexRet<string>[];
    /** Undefined if arg not found. */
    protected findArgIndexRet<U = any>(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): OrUndefined<TArgIndexRet<U>>;
}
export {};

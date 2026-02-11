import type { Optional } from "@rsc-utils/type-utils";
type SetLike<T> = {
    size: number;
    has(value: T): boolean;
    keys(): SetIterator<T>;
    [Symbol.iterator](): SetIterator<T>;
};
/**
 * A case insensitive string Set.
 */
export declare class StringSet implements Set<string> {
    private _values;
    constructor(values?: Optional<Iterable<string>>);
    [Symbol.iterator](): SetIterator<string>;
    get [Symbol.toStringTag](): string;
    add(value: string): this;
    clear(): void;
    delete(value: string): boolean;
    /** values in this but not in other */
    difference(other: SetLike<string>): StringSet;
    entries(): SetIterator<[Lowercase<string>, string]>;
    forEach(fn: (value: string, value2: Lowercase<string>, set: StringSet) => unknown, thisArg?: any): void;
    has(value: string): boolean;
    protected hasKey(key: Lowercase<string>): boolean;
    /** values in this and in other */
    intersection(other: SetLike<string>): StringSet;
    /** true if this set has no elements in common with the other set, and false otherwise. */
    isDisjointFrom(other: SetLike<string>): boolean;
    /** true if all elements in this set are also in the other set, and false otherwise. */
    isSubsetOf(other: SetLike<string>): boolean;
    /** true if all elements in the other set are also in this set, and false otherwise. */
    isSupersetOf(other: SetLike<string>): boolean;
    keys(): SetIterator<Lowercase<string>>;
    get size(): number;
    /** A new StringSet object containing elements which are in either this set or the other set, but not in both. */
    symmetricDifference(other: SetLike<string>): StringSet;
    /** A new StringSet object containing elements which are in either or both of this set and the other set. */
    union(other: SetLike<string>): StringSet;
    values(): SetIterator<string>;
    static from(setLike: SetLike<string>): StringSet;
}
export {};

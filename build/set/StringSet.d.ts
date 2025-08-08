import type { Optional } from "../types/generics.js";
/**
 * A case insensitive string Set.
 */
export declare class StringSet implements Set<string> {
    private _values;
    constructor(values?: Optional<Iterable<string>>);
    [Symbol.iterator](): IterableIterator<string>;
    get [Symbol.toStringTag](): string;
    add(value: string): this;
    clear(): void;
    delete(value: string): boolean;
    entries(): IterableIterator<[Lowercase<string>, string]>;
    forEach(fn: (value: string, value2: Lowercase<string>, set: StringSet) => unknown, thisArg?: any): void;
    has(key: string): boolean;
    keys(): IterableIterator<Lowercase<string>>;
    get size(): number;
    values(): IterableIterator<string>;
}

type ValueOf<T, U extends keyof T = keyof T> = T[U];
export declare class Collection<T> extends Array<T> {
    /** Convenience for this.length === 0 */
    get isEmpty(): boolean;
    /** Returns the first value found by the predicate. If one isn't found, it returns the first value found by the second predicate. Uses only one loop/iteration. */
    /** Returns the value and its index ([value, index]), or [undefined, -1] if the value is not found. */
    findWithIndex(predicate: (value: T, index: number, obj: Collection<T>) => unknown, thisArg?: any): [T | undefined, number];
    /** Removes all objects. */
    empty(): void;
    /** Returns a new Collection with only values that are not null and not undefined. */
    existing(): Collection<NonNullable<T>>;
    /** Convenience method for .filter().map() that uses a single iteration */
    filterAndMap<U>(predicate: (value: T, index: number, values: Collection<T>) => unknown, callbackfn: (value: T, newIndex: number) => U, thisArg?: any): Collection<U>;
    /** Returns the first object. */
    first(): T | undefined;
    /** Returns the last object. */
    last(): T | undefined;
    /** Convenience for .map(item => item.key); */
    pluck<U extends keyof T = keyof T, V extends ValueOf<T, U> = ValueOf<T, U>>(key: U): V[];
    /** When onlyUnique is true: Convenience for .map(item => item.key).filter(unique); */
    pluck<U extends keyof T = keyof T, V extends ValueOf<T, U> = ValueOf<T, U>>(key: U, onlyUnique: boolean): V[];
    /** Removes the values that return a truthy value, returning values that are't undefined. */
    remove(predicate: (value: T, index: number, obj: Collection<T>) => unknown, thisArg?: any): Collection<T>;
    /** Remove the value at the given index. */
    removeAt(index: number): T | undefined;
    /** Remove the values at the given indexes. */
    removeAt(indexes: number[]): (T | undefined)[];
    /** Returns a new array that doesn't contain the passed args */
    without(...args: T[]): Collection<T>;
    /** Creates a Collection from any ArrayLike */
    static from<T>(arrayLike: ArrayLike<T> | Iterable<T>): Collection<T>;
    /** Creates a Collection from any ArrayLike by mapping each element */
    static from<T, U>(arrayLike: ArrayLike<T> | Iterable<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Collection<U>;
}
export interface Collection<T> {
    concat(...items: ConcatArray<T>[]): Collection<T>;
    concat(...items: (T | ConcatArray<T>)[]): Collection<T>;
    filter(predicate: (value: T, index: number, collection: Collection<T>) => unknown, thisArg?: any): Collection<T>;
    filter<S extends T>(predicate: (value: T, index: number, collection: Collection<T>) => value is S, thisArg?: any): Collection<S>;
    forEach(callbackfn: (value: T, index: number, collection: Collection<T>) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, collection: Collection<T>) => U, thisArg?: any): Collection<U>;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, collection: Collection<T>) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, collection: Collection<T>) => T, initialValue: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, collection: Collection<T>) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, collection: Collection<T>) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, collection: Collection<T>) => T, initialValue: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, collection: Collection<T>) => U, initialValue: U): U;
    reverse(): this;
    slice(start?: number, end?: number): Collection<T>;
    splice(start: number, deleteCount?: number): Collection<T>;
    splice(start: number, deleteCount: number, ...items: T[]): Collection<T>;
}
export default Collection;

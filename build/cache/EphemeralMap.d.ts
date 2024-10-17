import { EphemeralBase } from "./EphemeralBase.js";
export declare class EphemeralMap<K, V> extends EphemeralBase<K, V> implements Map<K, V> {
    [Symbol.iterator](): IterableIterator<[K, V]>;
    get [Symbol.toStringTag](): string;
    /** sets a value to the data and then queues up the process */
    set(key: K, value: V): this;
    forEach(fn: (value: V, key: K, map: EphemeralMap<K, V>) => unknown, thisArg?: any): void;
    get(key: K): V | undefined;
}

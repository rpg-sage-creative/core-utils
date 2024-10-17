import { EphemeralBase } from "./EphemeralBase.js";
export declare class EphemeralSet<V> extends EphemeralBase<V, V> implements Set<V> {
    [Symbol.iterator](): IterableIterator<V>;
    get [Symbol.toStringTag](): string;
    /** adds a value to the data and then queues up the process */
    add(value: V): this;
    forEach(fn: (value: V, value2: V, set: EphemeralSet<V>) => unknown, thisArg?: any): void;
}

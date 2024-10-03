import type { Optional, OrNull, OrUndefined } from "./generics.js";
/**
 * Returns a new object by omitting the given keys from the given object.
 * This is a shallow copy, meaning any values that are objects will be references to the original.
 * If the object given is null, null is returned.
 * If the object given is undefined, undefined is returned.
 */
export declare function omit<T, U extends keyof T, V extends Omit<T, U>>(object: T, ...omittedKeys: U[]): V;
export declare function omit<T, U extends keyof T, V extends Omit<T, U>>(object: OrNull<T>, ...omittedKeys: U[]): OrNull<V>;
export declare function omit<T, U extends keyof T, V extends Omit<T, U>>(object: OrUndefined<T>, ...omittedKeys: U[]): OrUndefined<V>;
export declare function omit<T, U extends keyof T, V extends Omit<T, U>>(object: Optional<T>, ...omittedKeys: U[]): Optional<V>;

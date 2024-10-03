/** Returns a new object by omitting the given keys from the given object. This is a shallow copy, meaning any values that are objects will be references to the original. */
export declare function omit<T, U extends keyof T, V extends Omit<T, U>>(object: T, ...omittedKeys: U[]): V;

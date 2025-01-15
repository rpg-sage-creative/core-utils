/**
 * Uses reflection to recursively freeze an object.
 * Each individual object is checked to see if it is already frozen before calling freeze (just in case a part of it was frozen before deepFreeze was called).
 */
export declare function deepFreeze<T extends object>(object: T): T;

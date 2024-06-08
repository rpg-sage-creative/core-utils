import type { Optional } from "../generics.js";
/** Returns the (number) value of the enum for the given string value (ignoring case), or undefined. */
export declare function parseEnum<T>(_enum: unknown, value: Optional<string>): T | undefined;
/** Returns the (number) value of the enum for the given value, or undefined. */
export declare function parseEnum<T>(_enum: unknown, value: Optional<number>): T | undefined;
/** Returns the (number) value of the enum for the given string value (ignoring case), or the given defaultValue. */
export declare function parseEnum<T>(_enum: unknown, value: Optional<string>, defaultValue: T): T;
/** Returns the (number) value of the enum for the given value, or the given defaultValue. */
export declare function parseEnum<T>(_enum: unknown, value: Optional<number>, defaultValue: T): T;

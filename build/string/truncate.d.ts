import type { Optional } from "../types/generics.js";
/**
 * Truncates the string to the given max length (if it is longer).
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 */
export declare function truncate<T extends string = string>(value: T, maxLength: number): T;
/**
 * Truncates the string to the given max length (if it is longer).
 * If null or undefined are passed, they are returned instead.
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 */
export declare function truncate<T extends string = string>(value: Optional<T>, maxLength: number): Optional<T>;
/**
 * Truncates the string to the given max length (if it is longer).
 * The string will be truncated one extra letter so that the ellipsis character can be added at the end.
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 */
export declare function truncate<T extends string = string>(value: T, maxLength: number, ellipsis: true): T;
/**
 * Truncates the string to the given max length (if it is longer).
 * If null or undefined are passed, they are returned instead.
 * The string will be truncated one extra letter so that the ellipsis character can be added at the end.
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 */
export declare function truncate<T extends string = string>(value: Optional<T>, maxLength: number, ellipsis: true): Optional<T>;
/**
 * Truncates the string to the given max length (if it is longer).
 * The string will be truncated enough so that the given suffix can be added at the end.
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 * @param suffix The suffix to use instead of an ellipsis character.
 */
export declare function truncate<T extends string = string, U extends string = string>(value: T, maxLength: number, suffix: U): T;
/**
 * Truncates the string to the given max length (if it is longer).
 * If null or undefined are passed, they are returned instead.
 * The string will be truncated enough so that the given suffix can be added at the end.
 * @param value The string to be truncated.
 * @param maxLength The length to truncate the string to.
 * @param suffix The suffix to use instead of an ellipsis character.
 */
export declare function truncate<T extends string = string, U extends string = string>(value: Optional<T>, maxLength: number, suffix: U): Optional<T>;

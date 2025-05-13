import type { Optional, OrNull, OrUndefined } from "../types/generics.js";
/**
 * Capitalizes the first letter of the given string.
 * @param {T} value The string to be capitalized.
 */
export declare function capitalize<T extends string = string>(value: T): Capitalize<T>;
export declare function capitalize<T extends string = string>(value: OrUndefined<T>): OrUndefined<Capitalize<T>>;
export declare function capitalize<T extends string = string>(value: OrNull<T>): OrNull<Capitalize<T>>;
/**
 * Capitalizes the first letter of the given string.
 * If null or undefined are passed, they are returned instead.
 * @param {Optional<T>} value The string to be capitalized or returned.
 */
export declare function capitalize<T extends string = string>(value: Optional<T>): Optional<Capitalize<T>>;
/**
 * Capitalizes each substring (based on the given splitter).
 * @param {T} value The string to be capitalized.
 * @param {string | RegExp} splitter The way in which the string will be split.
 */
export declare function capitalize<T extends string = string>(value: T, splitter: string | RegExp): string;
/**
 * Capitalizes each substring (based on the given splitter).
 * If null or undefined are passed, they are returned instead.
 * @param {Optional<T>} value The string to be capitalized.
 * @param {string | RegExp} splitter The way in which the string will be split.
 */
export declare function capitalize<T extends string = string>(value: Optional<T>, splitter: string | RegExp): Optional<string>;
/**
 * Splits the string (using the splitter) before capitalizing each substring and rejoining then (using the joiner).
 * @param {T} value The string to be capitalized.
 * @param {string | RegExp} splitter The way in which the string will be split.
 * @param {string} joiner The string used to join the substrings back together.
 */
export declare function capitalize<T extends string = string>(value: T, splitter: string | RegExp, joiner: string): string;
/**
 * Capitalizes the first letter of the given string.
 * If a splitter is given, each substring will be capitalized.
 * If a joiner is given, it will be used to separate the subsections.
 */
export declare function capitalize(value: string, splitter: string | RegExp, joiner: string): string;

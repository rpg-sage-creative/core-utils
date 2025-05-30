import type { Optional, OrNull, OrUndefined } from "../../types/generics.js";
type Options = {
    /** use HORIZONTAL_WHITESPACE_REGEX if true, \s otherwise */
    horizontalOnly?: boolean;
    /** use replacement instead of " " */
    replacement?: string;
};
/**
 * Reduces adjacent whitespace characters to the options.replacement (default is a single space), then trims the string.
 * If options.horizontalOnly is true, then \n and \r are excluded from the whitespace replaced.
 */
export declare function cleanWhitespace(value: string, options?: Options): string;
/**
 * Reduces adjacent whitespace characters to the options.replacement (default is a single space), then trims the string.
 * If options.horizontalOnly is true, then \n and \r are excluded from the whitespace replaced.
 * If undefined is given, then undefined is returned.
 */
export declare function cleanWhitespace(value: OrUndefined<string>, options?: Options): OrUndefined<string>;
/**
 * Reduces adjacent whitespace characters to the options.replacement (default is a single space), then trims the string.
 * If options.horizontalOnly is true, then \n and \r are excluded from the whitespace replaced.
 * If null is given, then null is returned.
 */
export declare function cleanWhitespace(value: OrNull<string>, options?: Options): OrNull<string>;
/**
 * Reduces adjacent whitespace characters to the options.replacement (default is a single space), then trims the string.
 * If options.horizontalOnly is true, then \n and \r are excluded from the whitespace replaced.
 * If null or undefined are given, then the given value is returned.
 */
export declare function cleanWhitespace(value: Optional<string>, options?: Options): Optional<string>;
export {};

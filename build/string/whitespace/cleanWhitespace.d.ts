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
export {};

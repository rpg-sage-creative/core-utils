type Options = {
    insertSpaces?: boolean;
    maxLineLength?: number;
    tabSize?: number;
};
/**
 * Formats JSON as readable, while trying to keep {} or [] on a single line.
 * Default maxLineLength is 250.
 * Default spacer is a tab "\t".
 * If insertSpaces is true, the default tabSize is 4.
 */
export declare function formattedStringify<T>(object: T, options?: Options): string;
export {};

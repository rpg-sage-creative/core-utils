/** Formats JSON as readable, while trying to keep {} or [] on a single line <= 250 characters. */
export declare function formattedStringify<T>(object: T): string;
/** Formats JSON as readable, while trying to keep {} or [] on a single line <= maxLineLength characters. */
export declare function formattedStringify<T>(object: T, maxLineLength: number): string;

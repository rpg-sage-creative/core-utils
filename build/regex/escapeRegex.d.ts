/**
 * Escapes RegExp special characters in the given value.
 * This is a shim until RegExp.escape is available.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
 */
export declare function escapeRegex(value: string): string;

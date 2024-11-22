/**
 * Converts a decimal number (between 0-1) alpha to Hex.
 * Defaults to 1.
 * Values less than 0 treated as 0.
 * Values greater than 1 treated as 1.
 */
export declare function alphaToHex(value?: number): string;
/**
 * Converts a whole number (0-255) to Hex.
 * Values less than 0 treated as 0.
 * Values greater than 255 treated as 255.
 */
export declare function numberToHex(value: number): string;

/**
 * Converts a Hex based alpha to a decimal number (between 0-1) value.
 * Because this is a decimal representation of 0%-100%, values are rounded to precision 2: 0.00
 */
export declare function hexToAlpha(value: string): number;

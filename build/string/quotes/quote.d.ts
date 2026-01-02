/**
 * Puts quotes around a value.
 * If style is "smart", then the quotes used change depending on quotes found in the value: first "", then “”, then '', finally ‘’.
 * If style is "double" or "single" and the quotes used are in the value, they are escaped.
 * Default style: "double"
 */
export declare function quote(value: string, style?: "double" | "single" | "smart"): string;

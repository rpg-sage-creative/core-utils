import type { QuoteStyle } from "../../regex/getQuotedRegex.js";
/** Removes first and last character if they are both quotes. */
export declare function dequote(value: string, style?: QuoteStyle): string;

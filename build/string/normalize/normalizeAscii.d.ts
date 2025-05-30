type Options = {
    apostrophes?: boolean;
    dashes?: boolean;
    ellipses?: boolean;
    quotes?: boolean;
};
/**
 * Convenience for normalizeApostrophes(normalizeDashes(normalizeEllipses(normalizeQuotes(value)))).
 * Each normalize function is called (by default) if the options flag isn't explicitly false.
 */
export declare function normalizeAscii(text: string, options?: Options): string;
export {};

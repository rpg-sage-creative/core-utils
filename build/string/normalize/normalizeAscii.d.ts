type Options = {
    apostrophes?: boolean;
    dashes?: boolean;
    ellipses?: boolean;
    quotes?: boolean;
};
/** Convenience for normalizeApostrophes(normalizeDashes(normalizeEllipses(normalizeQuotes(value)))) */
export declare function normalizeAscii(text: string, options?: Options): string;
export {};

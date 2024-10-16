type NumericType = "number" | "super-number" | "sub-number" | "bigint" | "super-bigint" | "sub-bigint";
type NumericResults = {
    isBigInt: boolean;
    isNaN: boolean;
    isNumber: boolean;
    numericValue: number | bigint;
    stringValue: string;
    type: NumericType;
    value: string;
};
export declare function parseNumericString(value: string): NumericResults;
/** Parses the given numeric string into a number, bigint, or NaN. */
export declare function parseNumeric(value: string): number | bigint;
export {};

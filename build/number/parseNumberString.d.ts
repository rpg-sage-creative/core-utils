type NumberType = "number" | "super-number" | "sub-number" | "bigint" | "super-bigint" | "sub-bigint";
type ParseResults = {
    isBigInt: boolean;
    isNaN: boolean;
    isNumber: boolean;
    numericValue: number | bigint;
    stringValue: string;
    type: NumberType;
    value: string;
};
export declare function parseNumberString(value: string): ParseResults | undefined;
export {};

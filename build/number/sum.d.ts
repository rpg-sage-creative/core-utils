/** Calculates the sum total of all the numbers. */
export declare function sum(values: number[]): number;
/** Calculates the sum total of all the numbers received from the mapper. */
export declare function sum<T>(values: T[], mapper: (value: T, index: number, values: T[]) => number): number;

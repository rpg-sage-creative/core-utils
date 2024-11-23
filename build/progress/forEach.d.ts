/** A convenient iterator that logs progress using the given label. */
export declare function forEach<T>(label: string, array: T[], callbackfn: (value: T, index: number, array: T[]) => void, interval?: number): void;

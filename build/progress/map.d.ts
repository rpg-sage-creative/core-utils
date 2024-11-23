/** A convenient mapper that logs progress using the given label. */
export declare function map<T, U>(label: string, array: U[], callbackfn: (value: U, index: number, array: U[]) => T, interval?: number): T[];
/** A convenient mapper that logs progress using the given label. */
export declare function map<T extends Array<U>, U, V extends Array<W>, W>(label: string, array: V, callbackfn: (value: W, index: number, array: V) => U, interval?: number): V;

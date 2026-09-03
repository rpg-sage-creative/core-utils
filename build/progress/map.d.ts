/** A convenient mapper that logs progress using the given label. */
export declare function map<OutValue, InValue>(label: string, array: InValue[], callbackfn: (value: InValue, index: number, array: InValue[]) => OutValue, interval?: number): OutValue[];
/** A convenient mapper that logs progress using the given label. */
export declare function map<OutArray extends Array<OutValue>, OutValue, InArray extends Array<InValue>, InValue>(label: string, array: InArray, callbackfn: (value: InValue, index: number, array: InArray) => OutValue, interval?: number): OutArray;

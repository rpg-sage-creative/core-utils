type ValueFn<T, U> = (value: T) => {
    skip: boolean;
    value: U;
};
export declare function wrapMapIterator<T, U>(original: ArrayLike<T> | MapIterator<T>, valueFn: ValueFn<T, U>): MapIterator<U>;
export {};

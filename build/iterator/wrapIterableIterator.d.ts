type ValueFn<T, U> = (value: T) => {
    skip: boolean;
    value: U;
};
export declare function wrapIterableIterator<T, U>(original: ArrayLike<T> | IterableIterator<T>, valueFn: ValueFn<T, U>): IterableIterator<U>;
export {};

type ValueFn<T, U> = (value: T) => {
    skip: boolean;
    value: U;
};
export declare function wrapSetIterator<T, U>(original: ArrayLike<T> | SetIterator<T>, valueFn: ValueFn<T, U>): SetIterator<U>;
export {};

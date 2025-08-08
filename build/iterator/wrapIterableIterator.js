export function wrapIterableIterator(original, valueFn) {
    const array = Array.from(original);
    const wrapped = {
        [Symbol.iterator]() {
            return this;
        },
        next: () => {
            while (array.length) {
                const { value, skip } = valueFn(array.shift());
                if (!skip) {
                    return { value, done: false };
                }
            }
            return { done: true };
        }
    };
    return wrapped;
}

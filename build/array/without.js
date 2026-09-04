/** Returns a new array that doesn't contain the passed args */
export function without(array, ...args) {
    return array.filter(obj => !args.includes(obj));
}

/**
 * Filter that reduces an array to unique values.
 * Keeps only the first instance of a given value.
 */
export function toUnique(value, index, array) {
    return array.indexOf(value) === index;
}

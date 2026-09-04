import { isDefined } from "@rsc-utils/type-utils";
/**
 * Filter that reduces an array to unique/defined values.
 * Keeps only values that are !null && !undefined.
 * Keeps only the first instance of a given value.
 */
export function toUniqueDefined(value, index, array) {
    return isDefined(value) && array.indexOf(value) === index;
}

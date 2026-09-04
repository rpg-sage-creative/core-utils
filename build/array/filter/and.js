/**
 * Creates a single Filter function that tests each array element against the given filters.
 * If all given filters return true, the returned filter returns true.
 * Ex: .filter(and(isDefined, toUnique)) -> .filter((v, i, a) => isDefined(v, i, a) && toUnique(v, i, a))
 */
export function and(...filters) {
    return (value, index, array) => {
        for (const filter of filters) {
            if (!filter(value, index, array)) {
                return false;
            }
        }
        return true;
    };
}

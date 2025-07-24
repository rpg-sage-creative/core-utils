export function sortComparable(a, b) {
    if (a === b)
        return 0;
    if (a === undefined) {
        return 1;
    }
    else if (b === undefined) {
        return -1;
    }
    if (a === null) {
        return 1;
    }
    else if (b === null) {
        return -1;
    }
    return a.compareTo(b);
}

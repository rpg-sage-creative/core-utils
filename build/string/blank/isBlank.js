/** Returns true if null, undefined, or only whitespace. */
export function isBlank(value) {
    return !value?.trim().length;
}

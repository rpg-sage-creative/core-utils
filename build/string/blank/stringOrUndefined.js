/** Returns a non-blank string or undefined. */
export function stringOrUndefined(value) {
    return value?.trim().length ? value : undefined;
}

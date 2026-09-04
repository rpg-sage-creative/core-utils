/** Returns true if not null and not undefined and not only whitespace. */
export function isNotBlank(value) {
    return !!value?.trim().length;
}

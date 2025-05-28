export function stringOrUndefined(value) {
    return value?.trim().length ? value : undefined;
}

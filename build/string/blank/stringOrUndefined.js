export function stringOrUndefined(value) {
    const trimmed = value?.trim();
    return trimmed?.length ? trimmed : undefined;
}

let regexp;
export function isSnowflake(value) {
    if (value) {
        regexp ??= /^\d{16,}$/;
        return regexp.test(value);
    }
    return false;
}

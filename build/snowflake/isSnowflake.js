let _regexp;
export function isSnowflake(value) {
    if (value) {
        const regexp = _regexp ?? (_regexp = /^\d{16,}$/);
        return regexp.test(value);
    }
    return false;
}

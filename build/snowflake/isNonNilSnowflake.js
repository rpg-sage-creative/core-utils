export function isNonNilSnowflake(value) {
    if (value) {
        const regex = /^(?!0{16,})\d{16,}$/;
        return regex.test(value);
    }
    return false;
}

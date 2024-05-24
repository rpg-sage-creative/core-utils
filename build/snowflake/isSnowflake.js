export function isSnowflake(value) {
    if (value) {
        const regex = /^\d{16,}$/;
        return regex.test(value);
    }
    return false;
}

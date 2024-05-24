export function isNilSnowflake(value) {
    if (value) {
        const regex = /^0{16,}$/;
        return regex.test(value);
    }
    return false;
}

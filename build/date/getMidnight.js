export function getMidnight(dt = new Date()) {
    const midnightDate = new Date(0);
    midnightDate.setUTCFullYear(dt.getUTCFullYear());
    midnightDate.setUTCMonth(dt.getUTCMonth());
    midnightDate.setUTCDate(dt.getUTCDate());
    return midnightDate;
}

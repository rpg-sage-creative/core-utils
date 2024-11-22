export function getDateStrings(dt = new Date()) {
    const year = String(dt.getFullYear());
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    const hours = String(dt.getHours()).padStart(2, "0");
    const minutes = String(dt.getMinutes()).padStart(2, "0");
    const seconds = String(dt.getSeconds()).padStart(2, "0");
    const milli = String(dt.getMilliseconds()).slice(0, 3).padEnd(3, "0");
    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}.${milli}`;
    const dateTime = `${date} ${time}`;
    return {
        year, month, day,
        hours, minutes, seconds, milli,
        date, time, dateTime
    };
}

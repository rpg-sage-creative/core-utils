export function parseSnowflake(value) {
    const regex = /(?<id>\d{16,})/;
    const match = regex.exec(value ?? "");
    return match?.groups?.id ?? null;
}

const snowflakeRegex = /(?<id>\d{16,})/;
export function parseSnowflake(value) {
    const match = snowflakeRegex.exec(value ?? "");
    return match?.groups?.id ?? undefined;
}

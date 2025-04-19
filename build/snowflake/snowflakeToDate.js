const DISCORD_EPOCH = 1420070400000;
export function snowflakeToDate(snowflake, epoch = DISCORD_EPOCH) {
    const milliseconds = BigInt(snowflake) >> 22n;
    return new Date(Number(milliseconds) + epoch);
}

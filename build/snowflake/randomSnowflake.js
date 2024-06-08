import { DiscordSnowflake } from "@sapphire/snowflake";
export function randomSnowflake(options) {
    return DiscordSnowflake.generate(options).toString();
}

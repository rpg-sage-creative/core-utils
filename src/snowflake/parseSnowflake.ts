import type { Optional } from "../types/generics.js";
import type { Snowflake } from "./types.js";

const snowflakeRegex = /(?<id>\d{16,})/;

/** A convenient method for grabbing the first Snowflake present in the string. */
export function parseSnowflake(value: Optional<string>): Snowflake | undefined {
	const match = snowflakeRegex.exec(value ?? "");
	return match?.groups?.id as Snowflake ?? undefined;
}
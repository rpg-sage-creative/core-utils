import { isNonNilSnowflake } from "../snowflake/isNonNilSnowflake.js";
import type { Snowflake } from "../snowflake/types.js";
import type { Optional } from "../types/generics.js";
import { getFromProcess } from "./getFromProcess.js";

const _ids: Record<string, Snowflake[]> = { };

export function getIds(name: string): Snowflake[] {
	if (!_ids[name]) {
		const snowflakesValidator = (value: Optional<string | number | boolean | string[]>): value is string | Snowflake[] => {
			if (typeof(value) === "string") return value.split(",").every(isNonNilSnowflake);
			if (Array.isArray(value)) return value.every(isNonNilSnowflake);
			return false;
		};

		const raw = getFromProcess<string | Snowflake[]>(snowflakesValidator, `${name}Ids`);
		_ids[name] = Array.isArray(raw) ? raw : raw.split(",") as Snowflake[];
	}
	return _ids[name];
}
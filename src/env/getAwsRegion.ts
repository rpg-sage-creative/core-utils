import type { Optional } from "../types/generics.js";
import { getFromProcessSafely } from "./getFromProcessSafely.js";
import type { Region } from "./types.js";

export function getAwsRegion(key: string): Region | undefined {
	const regionValidator = (value: Optional<string | number | boolean>): value is Region => {
		return ["us-west-1", "us-west-2", "us-east-1", "us-east-2"].includes(value as string);
	};

	return getFromProcessSafely<Region>(regionValidator, key);
}
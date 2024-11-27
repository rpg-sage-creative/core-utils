import { getKeyValueArgRegex } from "./getKeyValueArgRegex.js";
import { type KeyValueArg } from "./KeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";

export function parseKeyValueArgs(input: string): KeyValueArg[] {
	return (input?.match(getKeyValueArgRegex()) ?? [])
		.map(match => parseKeyValueArg(match))
		.filter(arg => arg) as KeyValueArg[]
	// const regexp = getKeyValueArgRegex();
	// const matches = regexp.exec(input);
	// const args = matches?.map(match => parseKeyValueArg(match)) ?? [];
	// return args.filter(arg => arg) as KeyValueArg[];
}
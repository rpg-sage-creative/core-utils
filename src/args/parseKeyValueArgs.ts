import { getKeyValueArgRegex, type KeyValueArgMode } from "./getKeyValueArgRegex.js";
import { type KeyValueArg } from "./KeyValueArg.js";
import { parseKeyValueArg } from "./parseKeyValueArg.js";

type Options = {
	key?: string;
	mode?: KeyValueArgMode;
};


export function parseKeyValueArgs(input: string, options?: Options): KeyValueArg[] {
	const regexp = getKeyValueArgRegex({ ...options, gFlag:"g" });
	const matches = input?.match(regexp) ?? [];
	const args = matches.map(match => parseKeyValueArg(match));
	return args.filter(arg => arg) as KeyValueArg[];
}
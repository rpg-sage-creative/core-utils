import { isNullOrUndefined } from "../types/index.js";
import { stringifyJson } from "./stringifyJson.js";

type Options = {
	insertSpaces?: boolean;
	maxLineLength?: number;
	tabSize?: number;
};

/**
 * @deprecated use stringifyJson(object, null, "\t", 250)
 * Formats JSON as readable, while trying to keep {} or [] on a single line.
 * Default maxLineLength is 250.
 * Default spacer is a tab "\t".
 * If insertSpaces is true, the default tabSize is 4.
 */
export function formattedStringify<T>(object: T, options: Options = {}): string {
	if (isNullOrUndefined(object)) {
		return String(object);
	}
	return stringifyJson(
		object,
		null,
		options?.insertSpaces ? options.tabSize ?? 4 : "\t",
		options.maxLineLength ?? 250
	);
}

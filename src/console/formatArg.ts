import { stringifyJson } from "../json/stringifyJson.js";
import { isErrorLike } from "../types/typeGuards/isErrorLike.js";

/** Logging helper for formatting Error objects. */
export function formatArg(arg: any): string {
	if (isErrorLike(arg)) {
		const message = [arg.name, arg.message].filter(s => s).join(": ");
		return [message, arg.stack].filter(s => s).join("\n");
	}
	const asString = String(arg);
	if (!asString.startsWith("[object")) {
		return asString;
	}
	return stringifyJson(arg);
}
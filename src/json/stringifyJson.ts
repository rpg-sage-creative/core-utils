import { isDate } from "util/types";

/**
 * BigInt and Date friendly replacement for JSON.stringify().
 */
export function stringifyJson(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;

export function stringifyJson(value: any, replacer?: (string | number)[] | null, space?: string | number): string;

export function stringifyJson(value: any, replacer?: Function | (string | number)[] | null, space?: string | number): string {
	return JSON.stringify(value, function(this: any, key: string, value: any) {
		let retVal = value;
		if (replacer) {
			if (typeof(replacer) === "function") {
				retVal = replacer.call(this, key, value);
			}else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
				retVal = undefined!;
			}
		}

		if (isDate(retVal)) return { $date:String(retVal) };
		if (typeof(retVal) === "bigint") return { $bigint:value.toString() };
		return retVal;
	}, space);
}
import { isDate } from "util/types";
export function stringifyJson(value, replacer, space) {
    return JSON.stringify(value, function (key, value) {
        const cleanValue = this[key];
        if (isDate(cleanValue))
            return { $date: cleanValue.toISOString() };
        if (typeof (cleanValue) === "bigint")
            return { $bigint: cleanValue.toString() };
        if (replacer) {
            if (typeof (replacer) === "function") {
                return replacer.call(this, key, value);
            }
            else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
                return undefined;
            }
        }
        return value;
    }, space);
}

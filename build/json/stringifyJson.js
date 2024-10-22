import { isDate } from "util/types";
export function stringifyJson(value, replacer, space) {
    return JSON.stringify(value, function (key, value) {
        let retVal = value;
        if (replacer) {
            if (typeof (replacer) === "function") {
                retVal = replacer.call(this, key, value);
            }
            else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
                retVal = undefined;
            }
        }
        if (isDate(retVal))
            return { $date: String(retVal) };
        if (typeof (retVal) === "bigint")
            return { $bigint: value.toString() };
        return retVal;
    }, space);
}

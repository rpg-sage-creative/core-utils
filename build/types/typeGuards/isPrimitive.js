import { isDate } from "util/types";
export function isPrimitive(object) {
    return object === null
        || object === undefined
        || isDate(object)
        || ["number", "string", "boolean"].includes(typeof (object));
}

import { isDate } from "util/types";
export function isPrimitive(object) {
    return object === null
        || object === undefined
        || isDate(object)
        || ["bigint", "boolean", "number", "string"].includes(typeof (object));
}

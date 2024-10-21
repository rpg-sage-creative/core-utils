import { isPrimitive } from "../types/index.js";
function attempt(object, fnName) {
    if (typeof (object?.[fnName]) === "function") {
        object[fnName]();
    }
}
export function uncache(object, options) {
    if (isPrimitive(object)) {
        return null;
    }
    attempt(object, "clear");
    attempt(object, "destroy");
    Object.entries(object).forEach(([key, value]) => {
        attempt(value, "clear");
        attempt(value, "destroy");
        if (options?.nullify) {
            object[key] = null;
        }
        if (options?.undefine) {
            delete object[key];
        }
    });
    return null;
}
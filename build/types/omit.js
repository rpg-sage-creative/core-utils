import { isNullOrUndefined } from "./typeGuards/isNullOrUndefined.js";
export function omit(object, ...omittedKeys) {
    if (isNullOrUndefined(object))
        return object;
    const out = {};
    const keys = Object.keys(object);
    keys.forEach(key => {
        if (!omittedKeys.includes(key)) {
            out[key] = object[key];
        }
    });
    return out;
}

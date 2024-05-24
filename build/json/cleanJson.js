import { isPrimitive } from "../types/typeGuards/isPrimitive.js";
function canDeleteValueKey(value, rules) {
    return value === undefined && (rules === true || rules.deleteUndefined === true)
        || value === null && (rules === true || rules.deleteNull === true)
        || value === "" && (rules === true || rules.deleteEmptyString === true)
        || value === false && (rules === true || rules.deleteFalse === true)
        || value === 0 && (rules === true || rules.deleteZero === true)
        || isNaN(value) && (rules === true || rules.deleteNaN === true)
        || (typeof (value) === "string" && value.trim() === "") && (rules === true || rules.deleteBlankString === true);
}
export function cleanJson(value, rulesOrScrub) {
    if (isPrimitive(value)) {
        return value;
    }
    const rules = rulesOrScrub === "scrub" ? true : rulesOrScrub ?? { deleteUndefined: true };
    if (Array.isArray(value)) {
        if (value.length && (rules === true || rules.recursive)) {
            value.forEach(v => cleanJson(v, rulesOrScrub));
        }
        return value;
    }
    cleanObject(value, rules);
    return value;
}
function cleanObject(object, rules) {
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = object[key];
        if (canDeleteValueKey(value, rules)) {
            delete object[key];
        }
        else if (Array.isArray(value)) {
            if (value.length) {
                if (rules === true || rules.recursive) {
                    value.forEach(v => cleanJson(v, rules));
                }
            }
            else if (rules === true || rules.deleteEmptyArray) {
                delete object[key];
            }
        }
        else if (String(value) === "[object Object]") {
            if (rules === true || rules.recursive) {
                cleanJson(value, rules);
            }
            if ((rules === true || rules.deleteEmptyObject) && Object.keys(value).length === 0) {
                delete object[key];
            }
        }
    }
}

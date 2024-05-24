export function stringify(value, replacer, space) {
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
        return typeof (retVal) === "bigint" ? `bigint-${retVal}n` : retVal;
    }, space);
}

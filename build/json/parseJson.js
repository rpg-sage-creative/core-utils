export function parseJson(text, reviver) {
    return JSON.parse(text, function (key, value) {
        if (typeof (value?.$bigint) === "string") {
            if (Object.keys(value).length === 1) {
                value = BigInt(value.$bigint);
            }
        }
        if (typeof (value?.$date) === "string") {
            if (Object.keys(value).length === 1) {
                value = new Date(value.$date);
            }
        }
        if (reviver)
            return reviver.call(this, key, value);
        return value;
    });
}

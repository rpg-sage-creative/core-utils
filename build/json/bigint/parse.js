export function parse(text, reviver) {
    return JSON.parse(text, function (key, value) {
        if (typeof (value?.$bigint) === "string") {
            if (Object.keys(value).length === 1) {
                value = BigInt(value.$bigint);
            }
        }
        return reviver ? reviver.call(this, key, value) : value;
    });
}

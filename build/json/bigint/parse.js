export function parse(text, reviver) {
    return JSON.parse(text, function (key, value) {
        if (typeof (value) === "string") {
            const match = /^bigint-(\d+)n$/.exec(value);
            if (match) {
                value = BigInt(match[1]);
            }
        }
        return reviver ? reviver.call(this, key, value) : value;
    });
}

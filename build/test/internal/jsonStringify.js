export function jsonStringify(value) {
    return JSON.stringify(value, function (_key, _value) {
        return typeof (_value) === "bigint" ? `bigint-${_value}n` : _value;
    });
}

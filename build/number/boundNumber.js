export function boundNumber(value, options) {
    if (typeof (value) !== "number" || isNaN(value))
        return options.default;
    if (options.min !== undefined && value < options.min)
        return options.default;
    if (options.max !== undefined && value > options.max)
        return options.default;
    return value;
}

export function sum(values, mapper) {
    if (mapper) {
        return values.reduce((total, value, index, array) => total + mapper(value, index, array), 0);
    }
    return values.reduce((total, value) => total + value, 0);
}

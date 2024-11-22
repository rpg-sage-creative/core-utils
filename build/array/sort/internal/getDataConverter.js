export function getDataConverter(dataType) {
    switch (dataType) {
        case "date":
            return (value) => new Date(value);
        case "number":
            return Number;
        case "string":
            return String;
        default:
            return Object;
    }
}

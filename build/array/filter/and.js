import {} from "./Filter.js";
export function and(...filters) {
    return (value, index, array) => {
        for (const filter of filters) {
            if (!filter(value, index, array)) {
                return false;
            }
        }
        return true;
    };
}

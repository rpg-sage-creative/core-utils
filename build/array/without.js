import {} from "./Collection.js";
export function without(array, ...args) {
    return array.filter(obj => !args.includes(obj));
}
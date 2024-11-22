import { isDefined } from "../../types/index.js";
export function toUniqueDefined(value, index, array) {
    return isDefined(value) && array.indexOf(value) === index;
}

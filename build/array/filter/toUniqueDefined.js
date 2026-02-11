import { isDefined } from "@rsc-utils/type-utils";
export function toUniqueDefined(value, index, array) {
    return isDefined(value) && array.indexOf(value) === index;
}

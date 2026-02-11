import { isDefined } from "@rsc-utils/type-utils";
export function mapFirst(arrayLike, callbackfn, thisArg) {
    for (let index = 0; index < arrayLike.length; index++) {
        const result = callbackfn.call(thisArg, arrayLike[index], index, arrayLike);
        if (isDefined(result)) {
            return result;
        }
    }
    return undefined;
}

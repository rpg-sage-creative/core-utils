import { isPromise } from "util/types";
import { warn } from "../../console/index.js";
export async function filterAsync(array, predicate, thisArg) {
    const constructor = array.constructor;
    const filtered = new constructor();
    for (let index = 0, len = array.length; index < len; index++) {
        const item = array[index];
        try {
            const awaitable = predicate.call(thisArg, item, index, array);
            const result = isPromise(awaitable)
                ? await awaitable.catch((err) => warn(err instanceof Error ? err : new Error(err)))
                : awaitable;
            if (result) {
                filtered.push(item);
            }
        }
        catch (ex) {
            warn(ex instanceof Error ? ex : new Error(ex));
        }
    }
    return filtered;
}

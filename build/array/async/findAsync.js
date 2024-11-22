import { isPromise } from "util/types";
import { warn } from "../../console/index.js";
export async function findAsync(array, predicate, thisArg) {
    for (let index = 0, len = array.length; index < len; index++) {
        const item = array[index];
        try {
            const promise = predicate.call(thisArg, item, index, array);
            const result = isPromise(promise)
                ? await promise.catch((err) => warn(err instanceof Error ? err : new Error(err)))
                : promise;
            if (result) {
                return item;
            }
        }
        catch (ex) {
            warn(ex instanceof Error ? ex : new Error(ex));
        }
    }
    return undefined;
}

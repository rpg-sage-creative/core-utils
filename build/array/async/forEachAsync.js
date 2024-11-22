import { isPromise } from "util/types";
import { warn } from "../../console/index.js";
export async function forEachAsync(array, callbackfn, thisArg) {
    for (let index = 0, len = array.length; index < len; index++) {
        try {
            const awaitable = callbackfn.call(thisArg, array[index], index, array);
            if (isPromise(awaitable)) {
                await awaitable.catch((err) => warn(err instanceof Error ? err : new Error(err)));
            }
        }
        catch (ex) {
            warn(ex instanceof Error ? ex : new Error(ex));
        }
    }
}

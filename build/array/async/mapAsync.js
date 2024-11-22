import { isPromise } from "util/types";
import { warn } from "../../console/index.js";
export async function mapAsync(array, callbackfn, thisArg) {
    const arrayConstructor = array.constructor;
    const mapped = new arrayConstructor();
    for (let index = 0, len = array.length; index < len; index++) {
        try {
            const promise = callbackfn.call(thisArg, array[index], index, array);
            const result = isPromise(promise)
                ? await promise.catch((err) => warn(err instanceof Error ? err : new Error(err)))
                : promise;
            mapped.push(result);
        }
        catch (ex) {
            warn(ex instanceof Error ? ex : new Error(ex));
            mapped.push(undefined);
        }
    }
    return mapped;
}

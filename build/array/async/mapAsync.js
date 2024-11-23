import { isPromise } from "util/types";
import { warn } from "../../console/index.js";
import { PercentLogger } from "../../progress/PercentLogger.js";
export async function mapAsync(...args) {
    const label = typeof (args[0]) === "string" ? args.shift() : undefined;
    const array = Array.isArray(args[0]) ? args.shift() : undefined;
    if (!array) {
        throw new RangeError("mapAsync requires an array");
    }
    const callbackfn = typeof (args[0]) === "function" ? args.shift() : undefined;
    if (!callbackfn) {
        throw new RangeError("mapAsync requires a callbackfn");
    }
    const interval = typeof (args[0]) === "number" ? args.shift() : undefined;
    const thisArg = args[0];
    const pLogger = label ? new PercentLogger(label, array.length, interval) : undefined;
    pLogger?.start();
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
        pLogger?.increment();
    }
    return mapped;
}

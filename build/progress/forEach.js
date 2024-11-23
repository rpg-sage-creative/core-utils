import { PercentLogger } from "./PercentLogger.js";
export function forEach(label, array, callbackfn, interval) {
    const pLogger = new PercentLogger(label, array.length, interval);
    pLogger.start();
    array.forEach((val, i, arr) => {
        callbackfn(val, i, arr);
        pLogger.increment();
    });
}

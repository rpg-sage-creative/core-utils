import { PercentLogger } from "./PercentLogger.js";
export function map(label, array, callbackfn, interval) {
    const pLogger = new PercentLogger(label, array.length, interval);
    // trigger the 0% before processing the first item
    pLogger.start();
    return array.map((val, i, arr) => {
        const out = callbackfn(val, i, arr);
        pLogger.increment();
        return out;
    });
}

/** Used for catching a Promise. Logs the reason to the given handler and then returns the given returnValue. */
export declare function createCatcher<T>(handler: "error" | "warn", returnValue: T): (err: any) => T;

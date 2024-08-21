/**
 * A convenience method for using console.assert.
 * The callback method is called with all the given args and compared to the expected value.
 * The output for a failure is created to show the function name, args, and result as well as the expected value.
 */
export declare function assert<T>(expectedValue: T, callbackfn: Function, ...args: any[]): void;
/**
 * A passthrough for console.assert that allows tracking AssertData and
 */
export declare function assert<T>(testValue: boolean, ...valuesToLog: any[]): void;
/**
 * A convenience method for using console.assert.
 * The callback method is called with all the given args and compared to the expected value.
 * The output for a failure is created to show the function name, args, and result as well as the expected value.
 */
export declare function assertAsync<T>(expectedValue: T, callbackfn: Function, ...args: any[]): Promise<void>;

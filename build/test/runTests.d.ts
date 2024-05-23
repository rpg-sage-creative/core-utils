/** Convenient test process for dev/test. */
export declare function runTests(...tests: Function[]): Promise<void>;
export declare function runTests(exitOnFail: boolean, ...tests: Function[]): Promise<void>;

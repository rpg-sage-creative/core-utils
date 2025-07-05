type ErrorTester<T extends Error = Error> = (err: T) => boolean;
export declare function isError<T extends Error = Error>(err: unknown): err is T;
export declare function isError<T extends Error = Error>(err: unknown, message: string): err is T;
export declare function isError<T extends Error = Error>(err: unknown, tester: ErrorTester): err is T;
export {};

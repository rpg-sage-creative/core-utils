export type ErrorLike = {
    message: string;
    name: string;
    stack: string;
};
type ErrorTester<T extends Error = Error> = (err: T) => boolean;
export declare function isErrorLike(err: unknown, arg?: string | ErrorTester): err is ErrorLike;
export {};

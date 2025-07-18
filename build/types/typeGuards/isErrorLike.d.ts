export type ErrorLike<Name extends string = string> = {
    cause?: ErrorLike;
    message: string;
    name: Name;
    stack?: string;
};
type ErrorTester<Name extends string = string, Err extends ErrorLike<Name> = ErrorLike<Name>> = (err: Err) => boolean;
export declare function isErrorLike<Name extends string = string>(err: unknown, arg?: string | ErrorTester<Name>): err is ErrorLike<Name>;
export {};

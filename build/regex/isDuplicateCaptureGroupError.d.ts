import { type ErrorLike } from "../types/index.js";
type DuplicateCaptureGroupError = ErrorLike<"SyntaxError"> & {
    _dcge: never;
};
export declare function isDuplicateCaptureGroupError(ex: unknown): ex is DuplicateCaptureGroupError;
export declare function extractInvalidRegex(err: DuplicateCaptureGroupError): {
    source: string;
    flags: string;
};
export declare function retryDuplicateCaptureGroupName(err: DuplicateCaptureGroupError): RegExp;
export {};

import type { Optional } from "@rsc-utils/type-utils";
import type { RedactOptions } from "./RedactOptions.js";
export type RedactKeyValuePairsOptions = RedactOptions & {
    /** What character to use for redacted keys. */
    keyChar?: string;
    /** What character to use for redacted values. */
    valueChar?: string;
};
export declare function redactKeyValuePairs(content: string): string;
export declare function redactKeyValuePairs(content: string, redactedCharacter: string | undefined): string;
export declare function redactKeyValuePairs(content: string, options: RedactKeyValuePairsOptions): string;
export declare function redactKeyValuePairs(content: Optional<string>): Optional<string>;
export declare function redactKeyValuePairs(content: Optional<string>, redactedCharacter: string | undefined): Optional<string>;
export declare function redactKeyValuePairs(content: Optional<string>, options: RedactKeyValuePairsOptions): Optional<string>;

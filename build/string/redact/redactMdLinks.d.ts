import type { Optional } from "@rsc-utils/type-utils";
import type { RedactOptions } from "./RedactOptions.js";
export type RedactMdLinksOptions = RedactOptions & {
    /** What character to use for redacted labels. */
    labelChar?: string;
    /** What character to use for redacted urls. */
    urlChar?: string;
};
export declare function redactMdLinks(content: string, redactedCharacter?: string): string;
export declare function redactMdLinks(content: string): string;
export declare function redactMdLinks(content: string, redactedCharacter: string | undefined): string;
export declare function redactMdLinks(content: string, options: RedactMdLinksOptions): string;
export declare function redactMdLinks(content: Optional<string>): Optional<string>;
export declare function redactMdLinks(content: Optional<string>, redactedCharacter: string | undefined): Optional<string>;
export declare function redactMdLinks(content: Optional<string>, options: RedactMdLinksOptions): Optional<string>;

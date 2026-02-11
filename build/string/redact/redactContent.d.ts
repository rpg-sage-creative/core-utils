import type { Optional } from "@rsc-utils/type-utils";
import { type RedactCodeBlocksOptions } from "./redactCodeBlocks.js";
import { type RedactKeyValuePairsOptions } from "./redactKeyValuePairs.js";
import { type RedactMdLinksOptions } from "./redactMdLinks.js";
import type { RedactOptions } from "./RedactOptions.js";
type RedactContentOptions = RedactOptions & {
    codeBlocks?: boolean | RedactCodeBlocksOptions;
    keyValuePairs?: boolean | RedactKeyValuePairsOptions;
    mdLinks?: boolean | RedactMdLinksOptions;
};
/** Redacts codeBlocks, keyValuePairs, and mdLinks with a "*" char. */
export declare function redactContent(content: string): string;
/** Redacts codeBlocks, keyValuePairs, and mdLinks with redactedCharacter. */
export declare function redactContent(content: string, redactedCharacter: string | undefined): string;
/** All options default to true unless given as false. */
export declare function redactContent(content: string, options?: RedactContentOptions): string;
/** Redacts codeBlocks, keyValuePairs, and mdLinks with a "*" char. */
export declare function redactContent(content: Optional<string>): Optional<string>;
/** Redacts codeBlocks, keyValuePairs, and mdLinks with redactedCharacter. */
export declare function redactContent(content: Optional<string>, redactedCharacter: string | undefined): Optional<string>;
/** All options default to true unless given as false. */
export declare function redactContent(content: Optional<string>, options?: RedactContentOptions): Optional<string>;
export {};

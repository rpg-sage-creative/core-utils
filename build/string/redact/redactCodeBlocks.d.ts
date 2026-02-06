import type { Optional } from "../../types/generics.js";
import type { RedactOptions } from "./RedactOptions.js";
export type RedactCodeBlocksOptions = RedactOptions & {
    /** What character to use for redacted content. When complete === true, ticks get redacted as char; using contentChar allows them to be different. */
    contentChar?: string;
};
/**
 * Converts any characters within back-tick (`) quoted blocks to asterisks.
 * Ex: "a `code` block" becomes "a `****` block".
 * Ignores back-tick characters that are preceded by a slash (\).
 * Ex: " \`doesn't redact\` "
 * Matches 1, 2, or 3 back-tick characters (because Discord's Markdown supports them).
*/
export declare function redactCodeBlocks(content: string): string;
export declare function redactCodeBlocks(content: string, redactedCharacter: string | undefined): string;
export declare function redactCodeBlocks(content: string, options: RedactCodeBlocksOptions): string;
export declare function redactCodeBlocks(content: Optional<string>): Optional<string>;
export declare function redactCodeBlocks(content: Optional<string>, redactedCharacter: string | undefined): Optional<string>;
export declare function redactCodeBlocks(content: Optional<string>, options: RedactCodeBlocksOptions): Optional<string>;

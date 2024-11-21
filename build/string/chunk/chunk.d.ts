import type { ChunkOptions } from "./ChunkOptions.js";
import type { MaxChunkLengthCallback } from "./MaxChunkLengthCallback.js";
/**
 * Splits input into chunks using the default options ensuring that no "chunk" is greater than maxChunkLength (if given).
 * Default options: lineSplitter (default "\n"), wordSplitter (default " ")
 */
export declare function chunk(input: string): string[];
/** Splits input into chunks using the given options to override the defaults. */
export declare function chunk(input: string, opts: ChunkOptions): string[];
/** Splits input into chunks using the given maxChunkLength and the default options */
export declare function chunk(input: string, maxChunkLength: number): string[];
/** Splits input into chunks using the given maxChunkLength callback and the default options */
export declare function chunk(input: string, maxChunkLengthCallback: MaxChunkLengthCallback): string[];

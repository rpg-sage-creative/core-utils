import type { ChunkOptions } from "./types.js";
/**
 * Splits input into chunks ensuring that no "chunk" is greater than maxChunkLength (if given).
 * Default options: lineSplitter (default "\n"), wordSplitter (default " ")
 */
export declare function chunk(input: string, options?: ChunkOptions): string[];

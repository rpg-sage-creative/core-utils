/** Converts known /true/ values (true, 1, "true", "t", "1", "yes", "y") and /false/ values (false, 0, "false", "f", "0", "no", "n") to their boolean equivalent. */
export declare function parseBoolean(value: unknown): boolean | undefined;
/** Converts known /true/ values ("true", "t", "1", "yes", "y") and /false/ values ("f", "0", "no", "n") to their boolean equivalent. Optionally ignoring case. */
export declare function parseBoolean(value: string, ignoreCase: boolean): boolean | undefined;

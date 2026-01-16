/** Converts known /true/ values (true, 1, "true", "1", "yes") and /false/ values (false, 0, "false", "0", "no") to their boolean equivalent. */
export declare function parseBoolean(value: unknown): boolean | undefined;
/** Converts known /true/ values ("true", "1", "yes") and /false/ values ("false", "0", "no") to their boolean equivalent. Optionally ignoring case. */
export declare function parseBoolean(value: string, ignoreCase: boolean): boolean | undefined;

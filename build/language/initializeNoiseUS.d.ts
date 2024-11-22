/**
 * Loads the US noise words used by this repo.
 * By only initializing the data when needed, we can avoid wasted memory when apps don't need it.
 * The number of words added is returned.
 */
export declare function initializeNoiseUS(filePath?: string): number;

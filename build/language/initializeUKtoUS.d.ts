/**
 * Loads the uk/us pairs used by this repo.
 * By only initializing the data when needed, we can avoid wasted memory when apps don't need it.
 * The number of pairs added is returned.
 */
export declare function initializeUKtoUS(filePath?: string): number;

/**
 * Uses getFromProcess to get "dataRoot".
 * If "dataRoot" not found or the path is invalid, an error is thrown.
 * If dataPath is given the returned path will be join(dataRoot, dataPath).
 * If dataPath is given and doesn't exist, then dataPath will be created.
 * If childPath is given, the returned path will be join(dataRoot, dataPath, childPath).
 */
export declare function getDataRoot(dataPath?: string | string[], childPath?: string | string[]): string;
/**
 * @deprecated
 * Uses getFromProcess to get "dataRoot".
 * If "dataRoot" not found or the path is invalid, an error is thrown.
 * If dataPath is given the returned path will be join(dataRoot, dataPath).
 * If dataPath doesn't exist and ensurePathExists is true, then dataPath will be created.
 */
export declare function getDataRoot(dataPath: string, ensurePathExists: boolean): string;

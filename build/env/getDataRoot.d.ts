/**
 * Uses getFromProcess to get "dataRoot".
 * If not found or the path is invalid, an error is thrown.
 * If childPath is given the returned path will be `${dataRoot}/${childPath}`.
 * If childPath is given and is invalid, an error is thrown.
 */
export declare function getDataRoot(childPath?: string, ensureChildExists?: boolean): string;

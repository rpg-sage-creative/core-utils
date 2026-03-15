type Options = {
    /** the path passed into getDataRoot(); ensured by getDataRoot() */
    dir: string | string[];
    /** the child path appended after getDataRoot(dataPath); NOT ensured by getDataRoot() */
    subDir?: string | string[];
    /** the file name and extension */
    base: string;
    /** the file name */
    name?: never;
    /** an optional file extension to append if base doesn't include one; DEFAULT: "json" */
    ext?: never;
} | {
    /** the path passed into getDataRoot(); ensured by getDataRoot() */
    dir: string | string[];
    /** the child path appended after getDataRoot(dataPath); NOT ensured by getDataRoot() */
    subDir?: string | string[];
    /** the file name and extension */
    base?: never;
    /** the file name */
    name: string;
    /** an optional file extension to append if base doesn't include one; DEFAULT: "json" */
    ext?: string;
};
/**
 * Creates a filePath for the given fileName by using path.join(), getDataRoot(), and path.format().
 * If fileName does not include an extension, then ".json" will be added.
 * Convenience for: format({ dir:getDataRoot(join(dataPath)), name:fileName, ext:"json" )})
 * @param dataPath a string or array representing the path given to getDataRoot
 * @param fileName passed as "name" to format
 */
export declare function formatDataFilePath(dataPath: string | string[], fileName: string): string;
/**
 * Creates a filePath for the given fileName by using path.join(), getDataRoot(), and path.format().
 * Convenience for: format({ dir:getDataRoot(join(dataPath)), name:fileName, ext:fileExt )})
 * @param dataPath a string or array representing the path given to getDataRoot
 * @param fileName passed as "name" to format
 * @param fileExt passed as "ext" to format
 */
export declare function formatDataFilePath(dataPath: string | string[], fileName: string, fileExt: string): string;
/**
 * Creates a filePath for the given fileName by using path.join(), getDataRoot(), and path.format().
 * Convenience for: format({ dir:join(getDataRoot(join(options.dataPath)), options.childPath), name:options.fileName, ext:options.fileExt )})
 */
export declare function formatDataFilePath(options: Options): string;
export {};

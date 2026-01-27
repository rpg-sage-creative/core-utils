type BuildInfo = {
    name: string;
    version: string;
    branch: string;
    commit: string;
    commitSubject: string;
    commitTs: number;
    commitDate: string;
    buildTs: number;
    buildDate: string;
    author: string;
    rscLibs: {
        name: string;
        version: string;
    }[];
};
/** @deprecated use readRepo() instead. */
export declare function getBuildInfo(): Promise<BuildInfo>;
export {};

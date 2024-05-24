import { existsSync, readFileSync, readdirSync } from "fs";
import { parse } from "../json/bigint/parse.js";
let _rootPath;
function getRootPath() {
    if (!_rootPath) {
        _rootPath = ".";
        if (!existsSync(_rootPath + "/node_modules")) {
            _rootPath = "..";
        }
    }
    return _rootPath;
}
function readBuildInfo(repoPath, utilName) {
    try {
        const buildInfo = parse(readFileSync(`${repoPath}/build.json`).toString());
        if (!buildInfo.name && utilName) {
            buildInfo.name = utilName;
        }
        return buildInfo;
    }
    catch (ex) {
    }
    return null;
}
function getRscLibsBuildInfo() {
    const rootPath = getRootPath();
    const utilPath = `${rootPath}/node_modules/@rsc-utils`;
    const allNames = readdirSync(utilPath);
    const utilNames = allNames.filter(dirName => dirName.endsWith("-utils"));
    const buildInfos = utilNames.map(utilName => readBuildInfo(`${utilPath}/${utilName}`, `@rsc-utils/${utilName}`));
    return buildInfos.filter(info => !!info);
}
let buildInfo;
export function getBuildInfo() {
    if (!buildInfo) {
        buildInfo = readBuildInfo(getRootPath());
    }
    if (!buildInfo) {
        buildInfo = {
            name: "no-name",
            version: "0.0.0",
            branch: "mystery",
            commit: "",
            commitSubject: "unknown",
            commitTs: 0,
            commitDate: "1978-12-24-1945",
            buildTs: 0,
            buildDate: "1978-12-24-1945",
            author: "Randal T Meyer",
            rscLibs: []
        };
    }
    buildInfo.rscLibs = getRscLibsBuildInfo();
    return buildInfo;
}

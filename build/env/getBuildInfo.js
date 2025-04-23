import { exists, readFile, readdir } from "fs";
import { parseJson } from "../json/parseJson.js";
async function readBuildInfo(repoPath, utilName) {
    const raw = await new Promise(resolve => readFile(`${repoPath}/build.json`, null, (error, buffer) => resolve(error ? undefined : String(buffer)))).catch(() => undefined);
    if (!raw)
        return undefined;
    const buildInfo = parseJson(raw);
    if (!buildInfo.name && utilName) {
        buildInfo.name = utilName;
    }
    return buildInfo;
}
async function getRscLibsBuildInfo(rootPath) {
    const buildInfos = [];
    const utilPath = `${rootPath}/node_modules/@rsc-utils`;
    const allNames = await new Promise(resolve => readdir(utilPath, (err, files) => resolve(err ? [] : files))).catch(() => []);
    const utilNames = allNames.filter(dirName => dirName.endsWith("-utils"));
    for (const utilName of utilNames) {
        const buildInfo = await readBuildInfo(`${utilPath}/${utilName}`, `@rsc-utils/${utilName}`).catch(() => undefined);
        ;
        if (buildInfo) {
            buildInfos.push(buildInfo);
        }
    }
    return buildInfos;
}
export async function getBuildInfo() {
    const useCurrent = await new Promise(resolve => exists(`./node_modules`, resolve)).catch(() => false);
    const rootPath = useCurrent ? "." : "..";
    let buildInfo = await readBuildInfo(rootPath).catch(() => undefined);
    if (!buildInfo) {
        buildInfo = {
            name: "no-name",
            version: "0.0.0",
            branch: "mystery",
            commit: "",
            commitSubject: "unknown",
            commitTs: 0,
            commitDate: "2022-08-22-0000",
            buildTs: 0,
            buildDate: "2022-08-22-0000",
            author: "RPG Sage Creative, LLC",
            rscLibs: []
        };
    }
    buildInfo.rscLibs = await getRscLibsBuildInfo(rootPath);
    return buildInfo;
}

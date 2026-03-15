import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { verbose } from "../console/index.js";
import { getFromProcess } from "./getFromProcess.js";
const pathMap = new Map();
function shiftPath(args) {
    const arg = args.shift();
    if (typeof (arg) === "string")
        return arg;
    if (Array.isArray(arg))
        return join(...arg);
    return undefined;
}
function _getDataRoot() {
    let dataRoot = pathMap.get("");
    if (!dataRoot) {
        const dirValidator = (value) => typeof (value) === "string" ? existsSync(value) : false;
        dataRoot = getFromProcess(dirValidator, "dataRoot");
        pathMap.set("", dataRoot);
    }
    return dataRoot;
}
function _getDataPath(dataPath) {
    let dataDir = pathMap.get(dataPath);
    if (!dataDir) {
        dataDir = join(_getDataRoot(), dataPath);
        if (!existsSync(dataDir)) {
            verbose(`Creating dataPath: ${dataDir}`);
            mkdirSync(dataDir, { recursive: true });
        }
        pathMap.set(dataPath, dataDir);
    }
    return dataDir;
}
function _getChildPath(_dataPath, childPath) {
    let childDir = pathMap.get(childPath);
    if (!childDir) {
        childDir = join(_getDataPath(_dataPath), childPath);
        pathMap.set(childPath, childDir);
    }
    return childDir;
}
export function getDataRoot(...args) {
    const dataPath = shiftPath(args);
    if (!dataPath) {
        return _getDataRoot();
    }
    const childPath = shiftPath(args);
    if (!childPath) {
        return _getDataPath(dataPath);
    }
    return _getChildPath(dataPath, childPath);
}

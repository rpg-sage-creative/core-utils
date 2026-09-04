import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { verbose } from "../console/index.js";
import { getFromProcess } from "./getFromProcess.js";
const pathMap = new Map();
/**
 * Helper function for flattening path args.
 * The given args array is shifted once and a value is returned:
 *   - a "string" is returned as is
 *   - an Array is returned using join()
 *   - all other values are returned as undefined
 */
function shiftPath(args) {
    const arg = args.shift();
    if (typeof (arg) === "string")
        return arg;
    if (Array.isArray(arg))
        return join(...arg);
    return undefined;
}
function _getDataRoot() {
    // get cached dataroot
    let dataRoot = pathMap.get("");
    if (!dataRoot) {
        // initialize it if we don't have it
        const dirValidator = (value) => typeof (value) === "string" ? existsSync(value) : false;
        // get from settings
        dataRoot = getFromProcess(dirValidator, "dataRoot");
        // save to map
        pathMap.set("", dataRoot);
    }
    return dataRoot;
}
function _getDataPath(dataPath) {
    // get cached dataDir
    let dataDir = pathMap.get(dataPath);
    if (!dataDir) {
        // initialize it if we don't have it
        // join to dataRoot
        dataDir = join(_getDataRoot(), dataPath);
        // create the dir if it doesn't exist
        if (!existsSync(dataDir)) {
            verbose(`Creating dataPath: ${dataDir}`);
            mkdirSync(dataDir, { recursive: true });
        }
        // save to map
        pathMap.set(dataPath, dataDir);
    }
    return dataDir;
}
function _getChildPath(_dataPath, childPath) {
    // get cached childDir
    let childDir = pathMap.get(childPath);
    if (!childDir) {
        // initialize it if we don't have it
        // join to dataRoot
        childDir = join(_getDataPath(_dataPath), childPath);
        // save to map
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

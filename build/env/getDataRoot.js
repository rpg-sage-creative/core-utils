import { existsSync, mkdirSync } from "fs";
import { isString } from "../types/index.js";
import { getFromProcess } from "./getFromProcess.js";
const pathMap = new Map();
export function getDataRoot(childPath, ensureChildExists) {
    let dataRoot = pathMap.get("");
    if (!dataRoot) {
        const dirValidator = (value) => isString(value) ? existsSync(value) : false;
        dataRoot = getFromProcess(dirValidator, "dataRoot");
        pathMap.set("", dataRoot);
    }
    if (!childPath) {
        return dataRoot;
    }
    let dataPath = pathMap.get(childPath);
    if (!dataPath) {
        dataPath = `${dataRoot}/${childPath}`;
        if (ensureChildExists) {
            mkdirSync(dataPath, { recursive: true });
        }
        pathMap.set(childPath, dataPath);
    }
    return dataPath;
}

import { existsSync, mkdirSync } from "fs";
import { getFromProcess } from "./internal/getFromProcess.js";
function isValid(value) {
    return !!value && existsSync(String(value));
}
let _dataRoot;
export function getDataRoot(childPath, ensureExists) {
    if (!_dataRoot) {
        _dataRoot = getFromProcess(isValid, "dataRoot");
    }
    if (!childPath) {
        return _dataRoot;
    }
    const dataPath = `${_dataRoot}/${childPath}`;
    if (existsSync(dataPath)) {
        return dataPath;
    }
    if (ensureExists) {
        try {
            mkdirSync(dataPath, { recursive: true });
        }
        catch {
        }
    }
    if (existsSync(dataPath)) {
        return dataPath;
    }
    throw new Error(`Unable to create dataRoot child: ${dataPath}`);
}

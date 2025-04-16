import { existsSync, mkdirSync } from "fs";
import { getFromProcess } from "./getFromProcess.js";
let _dataRoot;
export function getDataRoot(childPath, ensureExists) {
    if (!_dataRoot) {
        const dirValidator = (value) => {
            return !!value && existsSync(String(value));
        };
        _dataRoot = getFromProcess(dirValidator, "dataRoot");
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

import { format } from "node:path";
import { getDataRoot } from "./getDataRoot.js";
export function formatDataFilePath(arg, name, ext) {
    let dataPath;
    let childPath;
    let base;
    if (typeof (arg) === "string" || Array.isArray(arg)) {
        dataPath = arg;
    }
    else {
        ({ dir: dataPath, subDir: childPath, base, name, ext } = arg);
    }
    // rootPath gets ensured by getDataRoot
    const dir = getDataRoot(dataPath, childPath);
    // set default ext to json
    if (!name?.endsWith(".json")) {
        ext ??= "json";
    }
    return format({ dir, base, name, ext });
}

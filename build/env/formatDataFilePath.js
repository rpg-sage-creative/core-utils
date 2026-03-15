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
    const dir = getDataRoot(dataPath, childPath);
    if (!name?.endsWith(".json")) {
        ext ??= "json";
    }
    return format({ dir, base, name, ext });
}

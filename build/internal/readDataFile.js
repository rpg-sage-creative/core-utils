import { existsSync, readFileSync } from "fs";
export function readDataFile(filePath, orFileName) {
    const paths = [
        filePath,
        `./node_modules/@rsc-utils/core-utils/data/${orFileName}`,
        `../node_modules/@rsc-utils/core-utils/data/${orFileName}`
    ];
    for (const path of paths) {
        try {
            if (path && existsSync(path)) {
                return readFileSync(path).toString();
            }
        }
        catch (ex) {
        }
    }
    return undefined;
}

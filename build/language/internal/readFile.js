import { existsSync, readFileSync } from "fs";
export function readFile(filePath, orFileName) {
    const paths = [
        filePath,
        `./node_modules/@rsc-utils/core-utils/data/language/${orFileName}`,
        `../node_modules/@rsc-utils/core-utils/data/language/${orFileName}`
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
    return null;
}

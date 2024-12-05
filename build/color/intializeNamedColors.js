import { readDataFile } from "../internal/readDataFile.js";
import { Color } from "./Color.js";
import { hexToColor } from "./internal/hexToColor.js";
import { getNamedColors } from "./namedColors.js";
export function intializeNamedColors(filePath) {
    const namedColors = getNamedColors();
    if (namedColors.size) {
        return 0;
    }
    const rawJson = readDataFile(filePath, "color/namedColors.json");
    const simpleColors = rawJson ? JSON.parse(rawJson) : [];
    simpleColors.forEach((simpleColor) => {
        const colorCore = hexToColor(simpleColor.hex);
        colorCore.names.push(simpleColor.name);
        const lower = simpleColor.name.toLowerCase();
        const color = new Color(colorCore);
        if (!namedColors.has(colorCore.hexa)) {
            namedColors.set(colorCore.hexa, color);
        }
        namedColors.set(lower, color);
    });
    return namedColors.size;
}

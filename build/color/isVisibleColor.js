import { toColorData } from "./internal/toColorData.js";
export function isVisibleColor(color) {
    if (!color)
        return false;
    const colorData = toColorData(color);
    if (!colorData)
        return false;
    return colorData.alpha === undefined || colorData.alpha > 0;
}

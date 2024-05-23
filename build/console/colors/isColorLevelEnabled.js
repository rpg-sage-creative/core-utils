import { getColorLevels } from "./colorLevels.js";
export function isColorLevelEnabled(colorLevel) {
    return getColorLevels()?.has(colorLevel) === true;
}

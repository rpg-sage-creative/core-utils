import { getColorLevels } from "./colorLevels.js";
/** @internal Checks to see if a given log level is allowed to have color. */
export function isColorLevelEnabled(colorLevel) {
    return getColorLevels()?.has(colorLevel) === true;
}

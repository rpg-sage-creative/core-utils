import { getColorLevels } from "./colorLevels.js";
/**
 * Enables the given log level to have color.
 */
export function enableColorLevel(...colorLevels) {
    const _colorLevels = getColorLevels(true);
    colorLevels.forEach(colorLevel => _colorLevels.add(colorLevel));
}

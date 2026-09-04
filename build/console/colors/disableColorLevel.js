import { getColorLevels } from "./colorLevels.js";
/** Disables the given log level from having color. */
export function disableColorLevel(...colorLevels) {
    const _colorLevels = getColorLevels();
    if (_colorLevels?.size) {
        colorLevels.forEach(colorLevel => _colorLevels.delete(colorLevel));
    }
}

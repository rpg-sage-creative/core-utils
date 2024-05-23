import { getColorLevels } from "./colorLevels.js";
export function disableColorLevel(...colorLevels) {
    const _colorLevels = getColorLevels();
    if (_colorLevels?.size) {
        colorLevels.forEach(colorLevel => _colorLevels.delete(colorLevel));
    }
}

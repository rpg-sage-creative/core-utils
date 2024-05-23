import { getColorLevels } from "./colorLevels.js";
export function enableColorLevel(...colorLevels) {
    const _colorLevels = getColorLevels(true);
    colorLevels.forEach(colorLevel => _colorLevels.add(colorLevel));
}

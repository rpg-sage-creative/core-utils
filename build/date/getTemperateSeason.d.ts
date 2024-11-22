import { Hemisphere } from "./Hemisphere.js";
import { TemperateSeason } from "./TemperateSeason.js";
/** Returns the Meteorological season that corresponds with the current date in the Nothern hemisphere. */
export declare function getTemperateSeason(): TemperateSeason;
/** Returns the Meteorological season that corresponds with the given date in the Nothern hemisphere. */
export declare function getTemperateSeason(date: Date): TemperateSeason;
/** Returns the Meteorological season that corresponds with the current date in the given hemisphere. */
export declare function getTemperateSeason(hemisphere: Hemisphere): TemperateSeason;
/** Returns the Meteorological season that corresponds with the given date in the given hemisphere. */
export declare function getTemperateSeason(date: Date, hemisphere: Hemisphere): TemperateSeason;

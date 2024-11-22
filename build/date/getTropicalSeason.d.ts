import { Hemisphere } from "./Hemisphere.js";
import { TropicalSeason } from "./TropicalSeason.js";
/** Returns the Meteorological season that corresponds with the current date in the Nothern hemisphere. */
export declare function getTropicalSeason(): TropicalSeason;
/** Returns the Meteorological season that corresponds with the given date in the Nothern hemisphere. */
export declare function getTropicalSeason(date: Date): TropicalSeason;
/** Returns the Meteorological season that corresponds with the current date in the given hemisphere. */
export declare function getTropicalSeason(hemisphere: Hemisphere): TropicalSeason;
/** Returns the Meteorological season that corresponds with the given date in the given hemisphere. */
export declare function getTropicalSeason(date: Date, hemisphere: Hemisphere): TropicalSeason;

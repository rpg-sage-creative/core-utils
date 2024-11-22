import { isDate } from "util/types";
import { Hemisphere } from "./Hemisphere.js";
import { TropicalSeason } from "./TropicalSeason.js";
import { flipSeasonForHemisphere } from "./internal/flipSeasonForHemisphere.js";
export function getTropicalSeason(...args) {
    const date = args.find(isDate) ?? new Date();
    const season = [
        TropicalSeason.Dry, TropicalSeason.Dry, TropicalSeason.Dry, TropicalSeason.Dry,
        TropicalSeason.Wet, TropicalSeason.Wet, TropicalSeason.Wet, TropicalSeason.Wet, TropicalSeason.Wet, TropicalSeason.Wet,
        TropicalSeason.Dry, TropicalSeason.Dry
    ][date.getMonth()];
    const hemisphere = args.find(arg => Hemisphere[arg] !== undefined) ?? Hemisphere.Northern;
    if (hemisphere === Hemisphere.Northern) {
        return season;
    }
    return flipSeasonForHemisphere(season);
}

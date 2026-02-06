import { isDate } from "node:util/types";
import { Hemisphere } from "./Hemisphere.js";
import { TemperateSeason } from "./TemperateSeason.js";
import { flipSeasonForHemisphere } from "./internal/flipSeasonForHemisphere.js";
export function getTemperateSeason(...args) {
    const date = args.find(isDate) ?? new Date();
    const season = [
        TemperateSeason.Winter, TemperateSeason.Winter,
        TemperateSeason.Spring, TemperateSeason.Spring, TemperateSeason.Spring,
        TemperateSeason.Summer, TemperateSeason.Summer, TemperateSeason.Summer,
        TemperateSeason.Fall, TemperateSeason.Fall, TemperateSeason.Fall,
        TemperateSeason.Winter
    ][date.getMonth()];
    const hemisphere = args.find(arg => Hemisphere[arg] !== undefined) ?? Hemisphere.Northern;
    if (hemisphere === Hemisphere.Northern) {
        return season;
    }
    return flipSeasonForHemisphere(season);
}

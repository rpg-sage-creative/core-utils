import type { DateLike } from "./DateLike.js";
import type { DateStrings } from "./DateStrings.js";
/** Returns a TDateStrings type for a new Date() */
export declare function getDateStrings(): DateStrings;
/** Returns a TDateStrings type for the given Date */
export declare function getDateStrings(date: DateLike): DateStrings;

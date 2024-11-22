import { Month } from "./Month.js";
export type MonthName = keyof typeof Month;
export declare function getMonthNames(): MonthName[];

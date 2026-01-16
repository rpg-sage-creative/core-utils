/**
 * Returns a duplicate of the given RegExp with the "g" flag added (if it was absent).
 * Can be used quickly clone a "g" RegExp when a unique instance is needed to avoid lastIndex issues.
 */
export declare function globalizeRegex<T extends RegExp>(regexp: RegExp): T;

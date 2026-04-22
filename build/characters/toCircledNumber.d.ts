type Options = {
    /** double circled numbers; only valid for 1-10 */
    double?: boolean;
    /** use dingbat variant; only valid for 0-10 */
    dingbat?: boolean;
    /** negative circled numbers (white number on black circle); only valid for 0-20 */
    negative?: boolean;
};
/**
 * Returns a circled number for the given value and options.
 * If a particular combination of value/options doesn't have a circled number, an empty string is returned.
 * Throws a TypeError if the value can't be coerced to a valid number.
 */
export declare function toCircledNumber(value: number | string): string;
export declare function toCircledNumber(value: number | string, options: Options): string;
export {};

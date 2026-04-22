type Options = {
    /** negative circled letters (white letter on black circle) */
    negative?: boolean;
};
/**
 * Returns a circled letter for the given value and options.
 * If a particular combination of value/options doesn't have a circled letter, an empty string is returned.
 * Throws a RangeError if the value isn't a letter between a-z or A-Z
 */
export declare function toCircledLetter(value: string): string;
export declare function toCircledLetter(value: string, options: Options): string;
export {};

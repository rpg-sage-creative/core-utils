type Options = {
    charClass?: boolean;
    vFlag?: "v";
};
/**
 * Escapes RegExp special characters in the given value.
 * If charClass is true, then "-" will be escaped as well.
 * if charClass is true and vFlag is "v", then "!#%&,:;<=>@`~" characters will be escaped, too.
 */
export declare function escapeRegex(value: string, options?: Options): string;
export {};

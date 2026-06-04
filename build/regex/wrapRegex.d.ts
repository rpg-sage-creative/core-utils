type Options = {
    /** make the wrap chars optional: `(regexp)|regex` */
    or?: boolean;
};
/**
 * Wraps the given RegExp in the given left/right pairs.
 * Left/right pairs are split using splitWrapChars() and then escaped for regexp using escapeRegex().
 * Optional spaces are added the inside of the wrap characters.
 * RegExp flags match the given RegExp.
 * The given RegExp is put into a non-capture group to preserve logic, such as | "or".
 * Ex: wrapRegex(/\d+/, ["||||"]) === /\|\|\s*(?:\d+)\s*\|\|/
 * options.or makes each set of wrap pairs optional in the final RegExp.
 * Ex: wrapRegex(/\d+/, ["||||"], { or:true }) === /\|\|\s*(?:\d+)\s*\|\||(?:\d+)/
 */
export declare function wrapRegex(regexp: RegExp, pairs: string[], options?: Options): RegExp;
export {};

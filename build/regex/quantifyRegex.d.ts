/** Matches as many as possible, giving back as needed. */
type GreedyQuantifier = 
/** match zero or one */
"?"
/** match zero or more */
 | "*"
/** match one or more */
 | "+"
/** match exact count */
 | `{${number}}`
/** match x or more */
 | `{${number},}`
/** match x to y */
 | `{${number},${number}}`;
/** Matches as few as possible, expanding as needed. */
type LazyQuantifier = `${GreedyQuantifier}?`;
/** Matches as many as possible, without giving back. */
type PossessiveQuantifier = `${GreedyQuantifier}+`;
/** How many tokens to match with a particular RegExp expression. */
export type RegExpQuantifier = GreedyQuantifier | LazyQuantifier | PossessiveQuantifier;
/**
 * Returns RegExp that is properly wrapped and quantified by the given options.
 * Because this uses the regex library, the resulting RegExp will include the "u" flag.
 */
export declare function quantifyRegex(regexp: RegExp, quantifier: RegExpQuantifier): RegExp;
export {};

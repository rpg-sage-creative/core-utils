/**
 * Used to wrap a piece of RegExp, usually with (), [], {}, or <>.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 */
export declare function wrapRegex(regexp: RegExp, chars: string, required: "optional" | true): RegExp;

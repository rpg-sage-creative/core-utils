import type { Optional } from "../../types/generics.js";
/**
 * Used to unwrap a piece of text, usually (), [], {}, or <>.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 * Unwraps multiple layers; thus chars = "()" will unwrap "(content)", "((content))", "(((content)))", etc.
 */
export declare function unwrap(input: string, chars: string): string;
export declare function unwrap(input: Optional<string>, chars: string): Optional<string>;

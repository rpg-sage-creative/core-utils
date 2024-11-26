import type { Optional } from "../../types/generics.js";
/**
 * Used to wrap a piece of text, usually with (), [], {}, or <>.
 * splitChars() is used to split/convert the given chars into left/right.
 */
export declare function wrap(input: string, chars: string): string;
export declare function wrap(input: Optional<string>, chars: string): Optional<string>;

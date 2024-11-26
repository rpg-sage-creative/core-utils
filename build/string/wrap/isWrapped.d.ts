import type { Optional } from "../../types/generics.js";
/**
 * Returns true if the input has characters wrapped by the given characters, false otherwise.
 * If the chars argument is even, then they are split and used as left/right.
 * If the chars argument is odd, then they are uesd as left and then they are reversed and used as right.
 */
export declare function isWrapped(input: Optional<string>, chars: string): input is string;

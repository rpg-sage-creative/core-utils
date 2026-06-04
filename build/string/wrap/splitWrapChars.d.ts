type WrapChars = {
    left: string;
    right: string;
};
/**
 * Splits the chars into left and right, primarily for use when wrapping text in pairs such as (), ||, and the like.
 * If the chars argument is even, then they are split evenly and used as left/right, such as "()" becoming `{ left:"(", right:")" }`.
 * If the chars argument is odd, then they are used as left and then they are reversed and used as right, such as "_*" becoming `{ left:"_*", right:"*_" }`.
 */
export declare function splitWrapChars(chars: string): WrapChars;
/** @deprecated renamed to splitWrapChars */
export declare const splitChars: typeof splitWrapChars;
export {};

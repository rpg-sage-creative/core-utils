import type { Optional } from "../types/generics.js";
export type BoundedOptions = {
    min?: number;
    max?: number;
    default?: number;
};
/** If the value is outside the bounds, the default value is returned. */
export declare function boundNumber(value: Optional<number>, options: BoundedOptions & {
    default: number;
}): number;
/** If the value is outside the bounds, the default value (or undefined if no default is given) is returned. */
export declare function boundNumber(value: Optional<number>, options: BoundedOptions): number | undefined;

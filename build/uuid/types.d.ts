/** A Constant value that represents a nil UUID. */
export declare const NIL_UUID: NIL_UUID;
/** A nil UUID has all 0s. */
export type NIL_UUID = UUID & {
    nil: never;
};
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

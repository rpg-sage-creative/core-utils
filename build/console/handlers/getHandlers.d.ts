/** Gets the handlers map or undefined. */
export declare function getHandlers<T extends string>(): Map<T, Set<Function>> | undefined;
/** Gets the handlers map, creating it if needed. */
export declare function getHandlers<T extends string>(create: true): Map<T, Set<Function>>;

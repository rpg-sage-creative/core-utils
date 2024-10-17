type UncacheOptions = {
    /** set all keys to null */
    nullify?: boolean;
    /** set all keys to undefined using delete */
    undefine?: boolean;
};
/**
 * Proactive memory management helper.
 * Calls .clear() and .destroy() on the given object if they exist.
 * The object is then iterated using Object.entries() where .clear() and .destroy() are attempted on each value.
 * @returns null for convenience, example: cache = uncache(cache);
 */
export declare function uncache(object: any): null;
/**
 * Proactive memory management helper.
 * Calls .clear() and .destroy() on the given object if they exist.
 * The object is then iterated using Object.entries() where .clear() and .destroy() are attempted on each value.
 * If options.nullify is true, then each key of object is set to null after attempting to clear/destroy them.
 * @returns null for convenience, example: cache = uncache(cache);
 */
export declare function uncache(object: any, options: UncacheOptions): null;
export {};

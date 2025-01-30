/**
 * Used for catching a Promise. Logs the reason to getLogger().error and then returns null.
 * @deprecated Stop using null, use errorReturnUndefined()
 */
export declare function errorReturnNull<T>(reason: T): null;

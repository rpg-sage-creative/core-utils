/**
 * Used for catching a Promise. Logs the reason to getLogger().warn and then returns null.
 * @deprecated Stop using null, use warnReturnUndefined()
 */
export declare function warnReturnNull<T>(reason: T): null;

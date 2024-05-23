/** Checks to see if the object given is a primitive type: null, undefined, Date, number, string, boolean. */
export declare function isPrimitive<T>(object: T): boolean;
/**
 * @todo take a long look at why i consider Date a primitive
 * ... i think because it stringifies to a number and new Date(number|date) gets a date.
 * */ 

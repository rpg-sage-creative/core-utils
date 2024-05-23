import { isDate } from "util/types";

/** Checks to see if the object given is a primitive type: null, undefined, Date, number, string, boolean. */
export function isPrimitive<T>(object: T): boolean {
	return object === null
		|| object === undefined
		|| isDate(object)
		|| ["number", "string", "boolean"].includes(typeof(object));
}

/**
 * @todo take a long look at why i consider Date a primitive
 * ... i think because it stringifies to a number and new Date(number|date) gets a date.
 * */
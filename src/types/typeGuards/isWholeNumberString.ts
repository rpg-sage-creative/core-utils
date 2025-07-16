const wholeNumberRegex = /^\d+$/;

/** Returns true if the value is a string of only numbers. */
export function isWholeNumberString(value: unknown): value is `${number}` {
	if (typeof(value) === "string") {
		return wholeNumberRegex.test(value);
	}
	return false;
}
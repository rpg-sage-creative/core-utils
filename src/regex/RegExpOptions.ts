import type { RegExpQuantifier } from "./quantifyRegex.js";

/** These options exclude global because they are for getting cached RegExp objects used for .test(). */
export type RegExpGetOptions = {
	/** include the case insensitive flag in the regex */
	iFlag?: "i" | "";
};

/** These options are intended for creating a new RegExp option each time to preserve the .lastIndex of each instance. */
export type RegExpCreateOptions = RegExpGetOptions & {
	/** include the global flag in the regex */
	gFlag?: "g" | "";
};

export type RegExpAnchorOptions = {
	/** require the value to be "anchored" to start/end of the string */
	anchored?: boolean;
};

export type RegExpCaptureOptions = {
	/** capture the RegExp with a named capture group */
	capture?: string;
};

export type RegExpQuantifyOptions = {
	/** how many to capture */
	quantifier?: RegExpQuantifier;
};

export type RegExpSpoilerOptions = {
	/** are spoilers allowed or optional */
	spoilers?: boolean | "optional";
};
import type { RegExpQuantifier } from "./quantifyRegex.js";

export type RegExpFlagOptions = {
	/** include the case insensitive flag in the regex */
	iFlag?: "i" | "";

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

export type RegExpWrapOptions = {
	/** the characters used to wrap the regex */
	chars: string;

	/** if the wrap characters are required or not */
	required: "optional" | true;
};

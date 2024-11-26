/**
 * "any" all double and single quotes, no limitations
 *
 * "double" limits to double quotes
 * "single" limits to single quotes
 *
 * "strict" limits to pure "double" and 'single' quotes
 * "fancy" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes
 * "extended" limits to pure "double" and 'single' and curly “double” and ‘single’ quotes as well as „German“ and „Polish” double quotes
 *
 * "double-strict" limits to pure "double" quotes
 * "double-fancy" limits to pure "double" and curly “double” quotes
 * "double-extended" limits to pure "double" and curly “double” quotes as well as „German“ and „Polish” double quotes
 *
 * "single-strict" limits to pure 'single' quotes
*/
export type QuoteStyle = "any" | "strict" | "fancy" | "extended" | "double" | "double-strict" | "double-fancy" | "double-extended" | "single" | "single-strict";

/** Represents the characters (and their metadata) used in quoting comments, dialog, or string values. */
type QuotePair = {
	/** The two characters that make up the pair of quotes, ex: "" or '' or “” or ‘’ */
	chars: string;

	/** Specifies if this pair is considered single quotes. */
	isSingle: boolean;

	/** Specifies if this pair is considered double quotes. */
	isDouble: boolean;

	/** Specifies if this pair is considered fancy quotes. */
	isFancy: boolean;

	/** Specifies if this pair is valid but not normally used quotes. Ex: „” */
	isExtended: boolean;

	/** Specifies if this pair is valid but uses arrows. Ex: „” */
	isArrow: boolean;
};

//#region (Single Quotes, Double Quotes, Dequote)

/** `'` */
const SINGLE = "\u0027";
/** `‘` */
const SINGLE_LEFT = "\u2018";
/** `’` */
const SINGLE_RIGHT = "\u2019";
/** `‚` */
// const SINGLE_LEFT_LOW = "\u201A";
/** `‹` */
// const SINGLE_ARROW_LEFT = "\u2039";
/** `›` */
// const SINGLE_ARROW_RIGHT = "\u203A";

/** `''` */
const SINGLE_UNIVERSAL = SINGLE + SINGLE;
/** `‘’` */
const SINGLE_ENGLISH = SINGLE_LEFT + SINGLE_RIGHT;

/** `"` */
const DOUBLE = "\u0022";
/** `“` */
const DOUBLE_LEFT = "\u201C";
/** `”` */
const DOUBLE_RIGHT = "\u201D";
/** `„` */
const DOUBLE_LEFT_LOW = "\u201E";
/** `«` */
const DOUBLE_ARROW_LEFT = "\u00AB";
/** `»` */
const DOUBLE_ARROW_RIGHT = "\u00BB";

/** `""` */
const DOUBLE_UNIVERSAL = DOUBLE + DOUBLE;
/** `“”` */
const DOUBLE_ENGLISH = DOUBLE_LEFT + DOUBLE_RIGHT;
/** `„“` */
const DOUBLE_GERMAN = DOUBLE_LEFT_LOW + DOUBLE_LEFT;
/** `„”` */
const DOUBLE_POLISH = DOUBLE_LEFT_LOW + DOUBLE_RIGHT;
/** `«»` */
const DOUBLE_FRENCH = DOUBLE_ARROW_LEFT + DOUBLE_ARROW_RIGHT;
/** `»«` */
const DOUBLE_SWEDISH = DOUBLE_ARROW_RIGHT + DOUBLE_ARROW_LEFT;

//#endregion

/** Creates and returns an array of quote pairs and their attributes. */
export function getQuotePairs(style?: QuoteStyle): QuotePair[] {
	// create pairs
	const pairs = [
		{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
		{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },

		{ chars:DOUBLE_GERMAN,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
		{ chars:DOUBLE_POLISH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
		{ chars:DOUBLE_FRENCH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },
		{ chars:DOUBLE_SWEDISH,   isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },

		{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
		{ chars:SINGLE_ENGLISH,   isSingle:true,  isDouble:false, isFancy:true,  isExtended:false, isArrow:false },
	];

	// filter on style
	if (style && style !== "any") {
		return pairs.filter(pair => {
			if (pair.isSingle && style.includes("double")) return false;
			if (pair.isDouble && style.includes("single")) return false;
			if ((pair.isFancy || pair.isExtended || pair.isArrow) && style.includes("strict")) return false;
			if ((pair.isExtended || pair.isArrow) && style.includes("fancy")) return false;
			if (pair.isArrow && style.includes("extended")) return false;
			return true;
		});
	}

	return pairs;
}
import { getQuotePairs } from "../../../build/index.js";

//#region (Single Quotes, Double Quotes, Dequote)

const SINGLE = "\u0027";
const SINGLE_LEFT = "\u2018";
const SINGLE_RIGHT = "\u2019";
// const SINGLE_LEFT_LOW = "\u201A";
// const SINGLE_ARROW_LEFT = "\u2039";
// const SINGLE_ARROW_RIGHT = "\u203A";

const SINGLE_UNIVERSAL = SINGLE + SINGLE;
const SINGLE_ENGLISH = SINGLE_LEFT + SINGLE_RIGHT;

const DOUBLE = "\u0022";
const DOUBLE_LEFT = "\u201C";
const DOUBLE_RIGHT = "\u201D";
const DOUBLE_LEFT_LOW = "\u201E";
const DOUBLE_ARROW_LEFT = "\u00AB";
const DOUBLE_ARROW_RIGHT = "\u00BB";

const DOUBLE_UNIVERSAL = DOUBLE + DOUBLE;
const DOUBLE_ENGLISH = DOUBLE_LEFT + DOUBLE_RIGHT;
const DOUBLE_GERMAN = DOUBLE_LEFT_LOW + DOUBLE_LEFT;
const DOUBLE_POLISH = DOUBLE_LEFT_LOW + DOUBLE_RIGHT;
const DOUBLE_FRENCH = DOUBLE_ARROW_LEFT + DOUBLE_ARROW_RIGHT;
const DOUBLE_SWEDISH = DOUBLE_ARROW_RIGHT + DOUBLE_ARROW_LEFT;

//#endregion

describe("quotes", () => {
	describe("getQuotePairs", () => {

		test(`getQuotePairs()`, () => expect(getQuotePairs()).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },
			{ chars:DOUBLE_GERMAN,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_POLISH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_FRENCH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },
			{ chars:DOUBLE_SWEDISH,   isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },

			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
			{ chars:SINGLE_ENGLISH,   isSingle:true,  isDouble:false, isFancy:true,  isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("strict")`, () => expect(getQuotePairs("strict")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },

			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("fancy")`, () => expect(getQuotePairs("fancy")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },

			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
			{ chars:SINGLE_ENGLISH,   isSingle:true,  isDouble:false, isFancy:true,  isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("extended")`, () => expect(getQuotePairs("extended")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },
			{ chars:DOUBLE_GERMAN,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_POLISH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },

			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
			{ chars:SINGLE_ENGLISH,   isSingle:true,  isDouble:false, isFancy:true,  isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("single-strict")`, () => expect(getQuotePairs("single-strict")).toStrictEqual([
			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("single")`, () => expect(getQuotePairs("single")).toStrictEqual([
			{ chars:SINGLE_UNIVERSAL, isSingle:true,  isDouble:false, isFancy:false, isExtended:false, isArrow:false },
			{ chars:SINGLE_ENGLISH,   isSingle:true,  isDouble:false, isFancy:true,  isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("double-strict")`, () => expect(getQuotePairs("double-strict")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("double-fancy")`, () => expect(getQuotePairs("double-fancy")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },
		]));

		test(`getQuotePairs("double-extended")`, () => expect(getQuotePairs("double-extended")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },
			{ chars:DOUBLE_GERMAN,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_POLISH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
		]));

		test(`getQuotePairs("double")`, () => expect(getQuotePairs("double")).toStrictEqual([
			{ chars:DOUBLE_UNIVERSAL, isSingle:false, isDouble:true,  isFancy:false, isExtended:false, isArrow:false },
			{ chars:DOUBLE_ENGLISH,   isSingle:false, isDouble:true,  isFancy:true,  isExtended:false, isArrow:false },
			{ chars:DOUBLE_GERMAN,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_POLISH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:false },
			{ chars:DOUBLE_FRENCH,    isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },
			{ chars:DOUBLE_SWEDISH,   isSingle:false, isDouble:true,  isFancy:false, isExtended:true,  isArrow:true  },
		]));

	});

});
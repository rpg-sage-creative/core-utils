import { ELLIPSIS, isNullOrUndefined, StringMatcher, tagLiterals } from "../../build/index.js";

describe("string", () => {
	describe("StringMatcher", () => {

		const NDASH = "\u2013", MDASH = "\u2014";
		const LEFT_D = "\u201C", RIGHT_D = "\u201D";
		const LEFT_S = "\u2018", RIGHT_S = "\u2019";

		const tests = [
			{ input:null,      isNonNil:false, isValid:false, lower:"", matchValue:"", value:null },
			{ input:undefined, isNonNil:false, isValid:false, lower:"", matchValue:"", value:undefined },
			{ input:"",        isNonNil:false, isValid:true,  lower:"", matchValue:"", value:"" },

			{ input:"Gandalf", isNonNil:true, isValid:true, lower:"gandalf", matchValue:"gandalf", value:"Gandalf" },
			{ input:`Gandalf the ${NDASH}`, isNonNil:true, isValid:true, lower:`gandalf the ${NDASH}`, matchValue:"gandalf the -", value:`Gandalf the ${NDASH}` },
			{ input:`Gandalf the ${MDASH}`, isNonNil:true, isValid:true, lower:`gandalf the ${MDASH}`, matchValue:"gandalf the -", value:`Gandalf the ${MDASH}` },
			{ input:`Gandalf the ${ELLIPSIS}`, isNonNil:true, isValid:true, lower:`gandalf the ${ELLIPSIS}`, matchValue:"gandalf the ...", value:`Gandalf the ${ELLIPSIS}`, matchesDots:true },
			{ input:"Gandalf the Grey", isNonNil:true, isValid:true, lower:"gandalf the grey", matchValue:"gandalf the grey", value:"Gandalf the Grey", matchesGrey:true },
			{ input:"Gandälf the Whité", isNonNil:true, isValid:true, lower:"gandälf the whité", matchValue:"gandalf the white", value:"Gandälf the Whité", matchesWhite:true },
			{ input:`Gandälf ${LEFT_D}the${RIGHT_D} Whité`, isNonNil:true, isValid:true, lower:`gandälf ${LEFT_D}the${RIGHT_D} whité`, matchValue:`gandalf "the" white`, value:`Gandälf ${LEFT_D}the${RIGHT_D} Whité` },
			{ input:`Gandälf ${LEFT_S}the${RIGHT_S} Whité`, isNonNil:true, isValid:true, lower:`gandälf ${LEFT_S}the${RIGHT_S} whité`, matchValue:`gandalf 'the' white`, value:`Gandälf ${LEFT_S}the${RIGHT_S} Whité` },
		];

		const nullMatcher = new StringMatcher();
		test(`nullMatcher.matches(nullMatcher) === false`, () => {
			expect(nullMatcher.matches(nullMatcher)).toBe(false);
		});

		const theDots = StringMatcher.from({ value:"Gandalf the ..." });
		const theGrey = StringMatcher.from({ value:"Gandalf the Gréy" });
		const theWhite = StringMatcher.from({ value:"Gandälf the White" });

		test(`StringMatcher.matches("Gandalf THE white", theWhite) === true`, () => {
			expect(StringMatcher.matches("Gandalf THE white", theWhite)).toBe(true);
		});
		test(`StringMatcher.matches("Gandalf THE white", theGrey) === false`, () => {
			expect(StringMatcher.matches("Gandalf THE white", theGrey)).toBe(false);
		});
		test(`StringMatcher.matchesAny("Gandalf THE white", [theGrey, "gandalf"]) === false`, () => {
			expect(StringMatcher.matchesAny("Gandalf THE white", [theGrey, "gandalf"])).toBe(false);
		});
		test(`StringMatcher.matchesAny("Gandalf THE white", [theWhite, "gandalf"]) === true`, () => {
			expect(StringMatcher.matchesAny("Gandalf THE white", [theWhite, "gandalf"])).toBe(true);
		});

		tests.forEach(({ input, isNonNil, isValid, lower, matchValue, value, matchesDots, matchesGrey, matchesWhite }) => {
			describe(tagLiterals`StringMatcher.from(${input})`, () => {
				const matcher = StringMatcher.from(input);
				test(tagLiterals`${{isNonNil,isValid,lower,matchValue,value}}`, () => {
					// compare all expected values
					expect(matcher.isNonNil).toBe(isNonNil);
					expect(matcher.isValid).toBe(isValid);
					expect(matcher.lower).toBe(lower);
					expect(matcher.matchValue).toBe(matchValue);
					expect(matcher.value).toBe(value);
					// value should be input
					expect(matcher.value).toBe(input);
					// toString() should return value ...
					expect(matcher.toString()).toBe(value);
					// ... which should be input
					expect(matcher.toString()).toBe(input);
				});
				test(`matcher.matches(nullMatcher) === false`, () => {
					expect(matcher.matches(nullMatcher)).toBe(false);
				});
				test(tagLiterals`matcher.matches(matcher) === matcher.isValid (${matcher.isValid})`, () => {
					expect(matcher.matches(matcher)).toBe(matcher.isValid);
				});
				test(tagLiterals`matcher.matches(theDots) === ${!!matchesDots}`, () => {
					expect(matcher.matches(theDots)).toBe(!!matchesDots);
				});
				test(tagLiterals`matcher.matches(theGrey) === ${!!matchesGrey}`, () => {
					expect(matcher.matches(theGrey)).toBe(!!matchesGrey);
				});
				test(tagLiterals`matcher.matches(theWhite) === ${!!matchesWhite}`, () => {
					expect(matcher.matches(theWhite)).toBe(!!matchesWhite);
				});
				test(tagLiterals`matcher.matchesAny(theDots, theGrey, theWhite) === ${!!matchesDots || !!matchesGrey || !!matchesWhite}`, () => {
					expect(matcher.matchesAny(theDots, theGrey, theWhite)).toBe(!!matchesDots || !!matchesGrey || !!matchesWhite);
				});
				test(tagLiterals`matcher.toRegex(): ${matcher.toRegex()}.test(${matcher.value}) === ${matcher.isValid}`, () => {
					expect(matcher.toRegex().test(matcher.value)).toBe(matcher.isValid);
					// match value for null/undefined is "", so we wanna test those values for invalid matchers
					expect(matcher.toRegex().test(matcher.isValid?matcher.matchValue:matcher.value)).toBe(matcher.isValid);
				});
				test(tagLiterals`matcher.toRegex({ whitespace:"optional" }): ${matcher.toRegex({ whitespace:"optional" })}.test(${matcher.value?.replace(/\s+/g, "")}) === ${matcher.isValid}`, () => {
					expect(matcher.toRegex({ whitespace:"optional" }).test(matcher.value?.replace(/\s+/g, ""))).toBe(matcher.isValid);
					// match value for null/undefined is "", so we wanna test those values for invalid matchers
					expect(matcher.toRegex({ whitespace:"optional" }).test(matcher.isValid?matcher.matchValue.replace(/\s+/g, ""):matcher.value)).toBe(matcher.isValid);
				});
				if (typeof(input) === "string" || isNullOrUndefined(input)) {
					test(`StringMatcher.from() === new StringMatcher()`, () => {
						const newMatcher = new StringMatcher(input);
						expect(matcher.isNonNil).toBe(newMatcher.isNonNil);
						expect(matcher.isValid).toBe(newMatcher.isValid);
						expect(matcher.lower).toBe(newMatcher.lower);
						expect(matcher.matchValue).toBe(newMatcher.matchValue);
						expect(matcher.value).toBe(newMatcher.value);

					});
				}
			});
		});
	});
});
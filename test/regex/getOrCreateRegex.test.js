import { enableLogLevels, getOrCreateRegex, tagLiterals } from "../../build/index.js";

enableLogLevels("development");

describe("regex", () => {
	describe("getOrCreateRegex", () => {

		describe("control tests", () => {
			test(`#1: create valid regex from string`, () => {
				let regex;
				expect(() => regex = new RegExp(`(?<first>second)`)).not.toThrow();
				expect(regex).toBeDefined();
				expect(regex.source).toBe(`(?<first>second)`);
				expect(regex.flags).toBe("");
			});

			test(`#2: create invalid regex from string; throw`, () => {
				let regex;
				expect(() => regex = new RegExp(`(?<first>second) (?<first>second)`)).toThrow("Invalid regular expression: /(?<first>second) (?<first>second)/: Duplicate capture group name");
				expect(regex).toBeUndefined();
			});
		});

		describe("unit tests", () => {
			test(`#1: getOrCreateRegex safely creates optional spoiler regex from valid regex`, () => {
				let regex;
				expect(() => regex = getOrCreateRegex(function unitTest1() { return /(?<first>second)/i; }, { spoilers:"optional" })).not.toThrow();
				expect(regex.source).toBe(`(?:\\|\\|(?:(?<first>second))\\|\\|)|(?:(?<first1>second))`);
				expect(regex.flags).toBe("i");
			});

			test(`#2: getOrCreateRegex safely creates regex when creator creates invalid regex with duplicate capture groups`, () => {
				let regex;
				expect(() => regex = getOrCreateRegex(function unitTest2() { return new RegExp(`(?<first>second) (?<first>second)`, "iv"); })).not.toThrow();
				expect(regex).toBeDefined();
				expect(regex.source).toBe(`(?<first>second) (?<first1>second)`);
				expect(regex.flags).toBe("iv");
			});

			test(`#3: getOrCreateRegex safely creates optional spoiler regex when creator creates invalid regex with duplicate capture groups`, () => {
				let regex;
				expect(() => regex = getOrCreateRegex(function unitTest3() { return new RegExp(`(?<first>second) (?<first1>second)`, "iv"); }, { spoilers:"optional" })).not.toThrow();
				expect(regex).toBeDefined();
				expect(regex.source).toBe(`(?:\\|\\|(?:(?<first>second) (?<first1>second))\\|\\|)|(?:(?<first2>second) (?<first3>second))`);
			});

		});


	});
});
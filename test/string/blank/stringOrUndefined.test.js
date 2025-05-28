import { stringOrUndefined, tagLiterals, toLiteral } from "../../../build/index.js";

describe("string", () => {
	describe("blank", () => {
		describe("stringOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(tagLiterals`stringOrUndefined(${s}) === undefined`, () => {
					expect(stringOrUndefined(s)).toBeUndefined();
				});
			});

			const nonBlankTests = ["bob", ".", "bob ", " ."];
			nonBlankTests.forEach(s => {
				test(tagLiterals`stringOrUndefined(${s}) === ${s}`, () => {
					expect(stringOrUndefined(s)).toBe(s);
				});
			});

		});
	});
});

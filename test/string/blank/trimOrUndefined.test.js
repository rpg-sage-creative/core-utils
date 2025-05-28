import { trimOrUndefined, toLiteral, tagLiterals } from "../../../build/index.js";

describe("string", () => {
	describe("blank", () => {
		describe("trimOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(tagLiterals`trimOrUndefined(${s}) === undefined`, () => {
					expect(trimOrUndefined(s)).toBeUndefined();
				});
			});

			const nonBlankTests = ["bob", ".", " bob ", " . "];
			nonBlankTests.forEach(s => {
				test(tagLiterals`trimOrUndefined(${s}) === ${s.trim()}`, () => {
					expect(trimOrUndefined(s)).toBe(s.trim());
				});
			});

		});
	});
});

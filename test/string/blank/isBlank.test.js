import { isBlank, tagLiterals } from "../../../build/index.js";

describe("string", () => {
	describe("blank", () => {
		describe("stringOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(tagLiterals`isBlank(${s}) === true`, () => {
					expect(isBlank(s)).toBe(true);
				});
			});

			const nonBlankTests = ["bob", "."];
			nonBlankTests.forEach(s => {
				test(tagLiterals`isBlank(${s}) === false`, () => {
					expect(isBlank(s)).toBe(false);
				});
			});

		});
	});
});
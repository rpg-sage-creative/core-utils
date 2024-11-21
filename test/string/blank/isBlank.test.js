import { isBlank } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("blank", () => {
		describe("stringOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(`isBlank(${toString(s)}) === true`, () => {
					expect(isBlank(s)).toBe(true);
				});
			});

			const nonBlankTests = ["bob", "."];
			nonBlankTests.forEach(s => {
				test(`isBlank(${toString(s)}) === false`, () => {
					expect(isBlank(s)).toBe(false);
				});
			});

		});
	});
});
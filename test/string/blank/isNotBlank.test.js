import { isNotBlank } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("blank", () => {
		describe("isNotBlank", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(`isNotBlank(${toString(s)}) === false`, () => {
					expect(isNotBlank(s)).toBe(false);
				});
			});

			const nonBlankTests = ["bob", "."];
			nonBlankTests.forEach(s => {
				test(`isNotBlank(${toString(s)}) === true`, () => {
					expect(isNotBlank(s)).toBe(true);
				});
			});

		});
	});
});
import { stringOrUndefined } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("blank", () => {
		describe("stringOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(`stringOrUndefined(${toString(s)}) === undefined`, () => {
					expect(stringOrUndefined(s)).toBeUndefined();
				});
			});

			const nonBlankTests = ["bob", "."];
			nonBlankTests.forEach(s => {
				test(`stringOrUndefined(${toString(s)}) === ${toString(s)}`, () => {
					expect(stringOrUndefined(s)).toBe(s);
				});
			});

		});
	});
});

import { stringOrUndefined, toLiteral } from "../../../build/index.js";

describe("string", () => {
	describe("blank", () => {
		describe("stringOrUndefined", () => {

			const blankTests = [null, undefined, "", "      ", "\n", "\t", "\n\t", "\n \t"];
			blankTests.forEach(s => {
				test(`stringOrUndefined(${toLiteral(s)}) === undefined`, () => {
					expect(stringOrUndefined(s)).toBeUndefined();
				});
			});

			const nonBlankTests = ["bob", "."];
			nonBlankTests.forEach(s => {
				test(`stringOrUndefined(${toLiteral(s)}) === ${toLiteral(s)}`, () => {
					expect(stringOrUndefined(s)).toBe(s);
				});
			});

			const trimTests = ["bob ", " ."];
			trimTests.forEach(s => {
				test(`stringOrUndefined(${toLiteral(s)}) === ${toLiteral(s.trim())}`, () => {
					expect(stringOrUndefined(s)).toBe(s.trim());
				});
			});

		});
	});
});

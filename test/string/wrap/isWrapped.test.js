import { isWrapped } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("wrap", () => {
		describe("isWrapped", () => {

			const tests = getTests();
			tests.forEach(({ unwrapped, chars, wrapped }) => {
				test(`isWrapped(${toString(wrapped)}, ${toString(chars)}) === true`, () => {
					expect(isWrapped(wrapped, chars)).toBe(true);
				});
				test(`isWrapped(${toString(chars)}, ${toString(chars)}) === false`, () => {
					expect(isWrapped(chars, chars)).toBe(false);
				});
				test(`isWrapped(${toString(unwrapped)}, ${toString(chars)}) === false`, () => {
					expect(isWrapped(unwrapped, chars)).toBe(false);
				});
			});

		});
	});
});

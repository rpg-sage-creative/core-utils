import { unwrap } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("wrap", () => {
		describe("unwrap", () => {

			const tests = getTests();
			tests.forEach(({ unwrapped, chars, wrapped }) => {
				test(`unwrap(${toString(wrapped)}, ${toString(chars)}) === ${toString(unwrapped)}`, () => {
					expect(unwrap(wrapped, chars)).toBe(unwrapped);
				})
			});

		});
	});
});

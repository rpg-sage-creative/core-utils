import { wrap } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("wrap", () => {
		describe("wrap", () => {

			const tests = getTests();
			tests.forEach(({ unwrapped, chars, wrapped }) => {
				test(`wrap(${toString(unwrapped)}, ${toString(chars)}) === ${toString(wrapped)}`, () => {
					expect(wrap(unwrapped, chars)).toBe(wrapped);
				})
			});

		});
	});
});

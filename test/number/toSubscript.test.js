import { toSubscript } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("number", () => {
	/** @type {[number|bigint,string][]} [input, output] */
	const tests = [
		[12345678.09, "₁₂₃₄₅₆₇₈\u2024₀₉"],
		[-12345678.09, "₋₁₂₃₄₅₆₇₈\u2024₀₉"],
		[12345678123456709n, "₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉"],
		[-12345678123456709n, "₋₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉"],
	];

	describe("toSubscript", () => {
		tests.forEach(([input, output]) => {
			test(`toSubscript(${toString(input)}) === ${toString(output)}`, () => {
				expect(toSubscript(input)).toBe(output);
			});
		});
	});

});

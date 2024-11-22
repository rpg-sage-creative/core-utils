import { alphaToHex } from "../../build/color/internal/toHex.js";
import { toString } from "../toString.mjs";

describe("color", () => {
	describe("alphaToHex", () => {
		const tests = [
			[0, "00"],
			[0.49, "7d"],
			[0.5, "80"],
			[0.51, "82"],
			[1, "ff"],
		];

		tests.forEach(([value, expected]) => {
			test(`alphaToHex(${toString(value)}) === ${toString(expected)}`, () => {
				expect(alphaToHex(value)).toBe(expected);
			});
		});

	});
});

import { numberToHex } from "../../build/color/internal/toHex.js";
import { toString } from "../toString.mjs";

describe("color", () => {
	describe("numberToHex", () => {
		const tests = [
			[0, "00"],
			[16, "10"],
			[128, "80"],
			[255, "ff"],
		];

		tests.forEach(([value, expected]) => {
			test(`numberToHex(${toString(value)}) === ${toString(expected)}`, () => {
				expect(numberToHex(value)).toBe(expected);
			});
		});

	});
});

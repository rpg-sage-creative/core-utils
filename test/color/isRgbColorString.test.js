import { isRgbColorString } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("color", () => {
	describe("isRgbColorString", () => {
		// [ [input, output], ... ]
		const tests = [
			// hex
			["#fff", false],
			// missing )
			["rgb(128,255,0", false],
			["rgb(128,255,0.0,2", false],
			// reversed rgb and rgba
			["rgba(128,255,0)", false],
			["rgb(128,255,0,0.5)", false],
			// invalid g
			["rgb(128,256,0)", false],
			// invalid alpha
			["rgb(128,255,0,2)", false],

			["rgb(128,255,0)", true],
			["rgba(128,255,0,0.5)", true],
		];

		tests.forEach(([value, expected]) => {
			test(`isRgbColorString(${toString(value)}) === ${expected}`, () => {
				expect(isRgbColorString(value)).toBe(expected);
			});
		});

	});
});

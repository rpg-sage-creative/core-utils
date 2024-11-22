import { parseHexColor } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("color", () => {
	describe("parseHexColor", () => {
		const tests = [
			["#12", undefined, undefined],
			["#12345", undefined, undefined],
			["#1234567", undefined, undefined],
			["#123456789", undefined, undefined],

			["#000", undefined, "#000000"],
			["#1111", undefined, "#11111111"],
			["#aaAAaa", undefined, "#aaaaaa"],
			["#fFfFfFfF", undefined, "#ffffffff"],

			["#80ff00", undefined, "#80ff00"],
			["#80ff00", true, "#80ff00ff"],
			["#80ff00", false, "#80ff00"],

			["#80ff0080", undefined, "#80ff0080"],
			["#80ff0080", true, "#80ff0080"],
			["#80ff0080", false, "#80ff00"],
		];

		tests.forEach(([value, arg, expected]) => {
			test(`parseHexColor(${toString(value)}, ${toString(arg)}) === ${toString(expected)}`, () => {
				expect(parseHexColor(value, arg)).toBe(expected);
			});
		});

	});
});

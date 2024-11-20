import { getEnumKeys, getEnumValues, parseEnum } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("types", () => {
	describe("enums", () => {

		let DayNight;
		(function (DayNight) {
			DayNight[DayNight["Day"] = 0] = "Day";
			DayNight[DayNight["Night"] = 1] = "Night";
		})(DayNight || (DayNight = {}));

		describe("getEnumValues", () => {
			test(`getEnumValues(${toString(DayNight)}) === [0,1]`, () => {
				expect(getEnumValues(DayNight)).toEqual([0,1]);
			});
		});

		describe("getEnumKeys", () => {
			test(`getEnumKeys(${toString(DayNight)}) === ["Day","Night"]`, () => {
				expect(getEnumKeys(DayNight)).toEqual(["Day","Night"]);
			});
		});

		describe("parseEnum", () => {
			/** [ [input, output], ... ] */
			const tests = [
				[0, 0],
				["day", 0],
				["Day", 0],
				[1, 1],
				["night", 1],
				["Night", 1],
				["1", undefined],
				[2, undefined],
				["daynight", undefined],
				[undefined, undefined],
				[null, undefined],
			];
			tests.forEach(([input, output]) => {
				test(`parseEnum(${toString(DayNight)}, ${toString(input)}) === ${toString(output)}`, () => {
					expect(parseEnum(DayNight, input)).toBe(output);
				});
			});
		});

	});
});
import { Color } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("color", () => {
	describe("Color.from", () => {

		const tests = [
			["#80FF00", {
				hexa: '#80ff00ff',
				hex: '#80ff00',
				rgba: 'rgba(128,255,0,1)',
				rgb: 'rgb(128,255,0)',
				red: 128,
				green: 255,
				blue: 0,
				alpha: 1
			}],
			["rgb(128,255,0)", {
				hexa: '#80ff00ff',
				hex: '#80ff00',
				rgba: 'rgba(128,255,0,1)',
				rgb: 'rgb(128,255,0)',
				red: 128,
				green: 255,
				blue: 0,
				alpha: 1
			}],
			["#80FF0080", {
				hexa: '#80ff0080',
				hex: '#80ff00',
				rgba: 'rgba(128,255,0,0.5)',
				rgb: 'rgb(128,255,0)',
				red: 128,
				green: 255,
				blue: 0,
				alpha: 0.5
			}],
		];

		tests.forEach(([input, data]) => {
			test(`Color.from(${toString(input)}).data === ${toString(data)}`, () => {
				expect(Color.from(input)?.data).toEqual(data);
			});
		});

	});
});

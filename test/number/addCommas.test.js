import { addCommas } from "../../build/index.js";

describe("number", () => {
	describe("addCommas", () => {
		/** @type {[number, string][]} [input, output] */
		const tests = [
			[12345, "12,345"],
			[12345, "12,345"],
			[12345, "12,345"],
		];

		tests.forEach(([input, output]) => {
			test(`addCommas(${input}) === ${JSON.stringify(output)}`, () => {
				expect(addCommas(input)).toBe(output);
			});
		});
	});
});

import { sum } from "../../build/index.js";

describe("number", () => {
	describe("sum", () => {
		/** @type {[number[], number][]} [input, output] */
		const tests = [
			[[1, 2, -3, -4, 3], -1],
			[[1, 2, 3, 4], 10],
		];

		tests.forEach(([input, output]) => {
			test(`sum(${JSON.stringify(input)}) === ${output}`, () => {
				expect(sum(input)).toBe(output);
			});
		});
	});
});

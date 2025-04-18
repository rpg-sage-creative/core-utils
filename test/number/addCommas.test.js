import { addCommas, toLiteral } from "../../build/index.js";

describe("number", () => {
	describe("addCommas", () => {
		const tests = [
			{ input:12345, expected:"12,345" },
			{ input:12345678, expected:"12,345,678" },
			{ input:12345678901, expected:"12,345,678,901" },
		];

		tests.forEach(({ input, expected }) => {
			test(`addCommas(${toLiteral(input)}) === ${toLiteral(expected)}`, () => {
				expect(addCommas(input)).toBe(expected);
			});
		});
	});
});

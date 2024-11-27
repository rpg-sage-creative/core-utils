import { truncate, ELLIPSIS } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("string", () => {
	describe("truncate", () => {

		const tests = [
			{ input:`1234567890`, length:5, options:undefined, expected:`12345` },
			{ input:`1234567890`, length:5, options:true, expected:`1234`+ELLIPSIS },
			{ input:`1234567890`, length:5, options:"...", expected:`12...` },
		];
		tests.forEach(({ input, length, options, expected }) => {
			test(`truncate(${toString(input)}, ${toString(length)}, ${toString(options)}) === ${toString(expected)}`, () => {
				expect(truncate(input, length, options)).toBe(expected);
			});
		});

	});
});

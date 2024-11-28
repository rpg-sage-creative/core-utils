import { parseKeyValueArgs } from "../../build/index.js";
import { toString } from "../toString.mjs";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArgs", () => {

		const tests = getTests("parseKeyValueArgs");
		tests.forEach(({ input, options, expected }) => {
			test(`parseKeyValueArgs(${toString(input)}, ${toString(options)})`, () => {
				expect(parseKeyValueArgs(input, options)).toStrictEqual(expected);
			});
		});

	});
});

import { parseKeyValueArg } from "../../build/index.js";
import { toString } from "../toString.mjs";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArg", () => {

		const tests = getTests("parseKeyValueArg");
		tests.forEach(({ input, options, expected }) => {
			test(`parseKeyValueArg(${toString(input)}, ${toString(options)})`, () => {
				expect(parseKeyValueArg(input, options)).toStrictEqual(expected);
			});
		});

	});
});

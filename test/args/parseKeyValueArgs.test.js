import { parseKeyValueArgs, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArgs", () => {

		const tests = getTests("parseKeyValueArgs");
		tests.forEach(({ input, options, expected }) => {
			test(`parseKeyValueArgs(${toLiteral(input)}, ${toLiteral(options)})`, () => {
				expect(parseKeyValueArgs(input, options)).toStrictEqual(expected);
			});
		});

	});
});

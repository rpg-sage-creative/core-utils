import { parseKeyValueArg, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArg", () => {

		const tests = getTests("parseKeyValueArg");
		tests.forEach(({ input, options, expected }) => {
			test(`parseKeyValueArg(${toLiteral(input)}, ${toLiteral(options)})`, () => {
				expect(parseKeyValueArg(input, options)).toStrictEqual(expected);
			});
		});

	});
});

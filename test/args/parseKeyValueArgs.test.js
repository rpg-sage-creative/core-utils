import { parseKeyValueArgs, tagLiterals } from "../../build/index.js";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArgs", () => {

		const tests = getTests("parseKeyValueArgs");
		tests.forEach(({ input, options, expected }) => {
			test(tagLiterals`parseKeyValueArgs(${input}, ${options})`, () => {
				expect(parseKeyValueArgs(input, options)).toEqual(expected);
			});
		});

	});
});

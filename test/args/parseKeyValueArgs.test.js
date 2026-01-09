import { tagLiterals } from "@rpg-sage-creative/template-literal-utils";
import { parseKeyValueArgs } from "../../build/index.js";
import { getTests } from "./data.js";

describe("args", () => {
	describe("parseKeyValueArgs", () => {

		const tests = getTests("parseKeyValueArgs");
		tests.forEach(({ input, expected }) => {
			test(tagLiterals`parseKeyValueArgs(${input})`, () => {
				expect(parseKeyValueArgs(input)).toEqual(expected);
			});
		});

	});
});

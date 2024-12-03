import { dequote } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("dequote", () => {

		const tests = getTests("dequote");
		tests.forEach(({ quoted, style, contents, unquoted }) => {
			const options = { style, contents };
			test(`dequote(${toString(quoted)}, ${toString(options)}) === ${unquoted}`, () => {
				expect(dequote(quoted, options)).toBe(unquoted);
			});
		});

	});
});
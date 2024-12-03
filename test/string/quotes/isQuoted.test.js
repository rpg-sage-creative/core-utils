import { isQuoted } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("quotes", () => {
		describe("isQuoted", () => {

			const tests = getTests("isQuoted");
			tests.forEach(args => {
				const quoted = args.quoted;
				const options = { style:args.style, contents:args.contents };
				const expected = args.isQuoted ?? true;
				test(`isQuoted(${toString(quoted)}, ${toString(options)}) === ${expected}`, () => {
					expect(isQuoted(quoted, options)).toBe(expected);
				});
			});

		});
	});
});
import { quote } from "../../../build/index.js";
import { toString } from "../../toString.mjs";
import { getTests } from "./data.js";

describe("string", () => {
	describe("quotes", () => {
		describe("quote", () => {

			const tests = getTests("quote");
			tests.forEach(({unquoted, style, quoted}) => {
				test(`quote(${toString(unquoted)}, ${toString(style)}) === ${toString(quoted)}`, () => {
					expect(quote(unquoted, style)).toBe(quoted);
				});
			});

		});
	});
});

import { stringifyJson } from "../../build/index.js";
import { getTests } from "./data.js";

describe("json", () => {
	describe("stringifyJson", () => {

		/** @type {[object, string, string][]} [object, string, label] */
		const tests = getTests("stringifyJson");

		tests.forEach(([object, string, label]) => {
			test(`stringifyJson(${label}) === ${JSON.stringify(string)}`, () => {
				expect(stringifyJson(object)).toBe(string);
			});
		});

	});
});

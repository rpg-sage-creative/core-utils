import { parseJson } from "../../build/index.js";
import { toString } from "../toString.mjs";
import { getTests } from "./data.js";

describe("json", () => {
	describe("parseJson", () => {

		/** @type {[object, string, string][]} [object, string, label] */
		const tests = getTests("parseJson");

		tests.forEach(([object, string, label]) => {
			test(`parseJson(${toString(string)}) equals ${label}`, () => {
				expect(parseJson(string)).toEqual(object);
			});
		});

	});
});

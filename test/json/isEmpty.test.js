import { isEmpty } from "../../build/index.js";
import { toString } from "../toString.mjs";
import { getTests } from "./data.js";

describe("json", () => {
	describe("isEmpty", () => {

		/** @type {[object, boolean, boolean][]} [object, empty, keyless] */
		const tests = getTests("isEmpty");

		tests.forEach(([object, empty, keyless]) => {
			test(`isEmpty(${toString(object)}) === ${empty}`, () => {
				expect(isEmpty(object)).toBe(empty);
			})
		});

	});
});

import { isEmpty } from "../../build/index.js";
import { getTests } from "./data.js";

describe("json", () => {
	describe("isEmpty", () => {

		/** @type {[object, boolean, boolean][]} [object, empty, keyless] */
		const tests = getTests("isEmpty");

		tests.forEach(([object, empty, keyless]) => {
			test(`isEmpty(${JSON.stringify(object)}) === ${empty}`, () => {
				expect(isEmpty(object)).toBe(empty);
			})
		});

	});
});

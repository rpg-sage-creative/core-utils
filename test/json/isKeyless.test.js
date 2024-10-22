import { isKeyless } from "../../build/index.js";
import { getTests } from "./data.js";

describe("json", () => {
	describe("isKeyless", () => {

		/** @type {[object, boolean, boolean][]} [object, empty, keyless] */
		const tests = getTests("isKeyless");

		tests.forEach(([object, empty, keyless]) => {
			test(`isKeyless(${JSON.stringify(object)}) === ${keyless}`, () => {
				expect(isKeyless(object)).toBe(keyless);
			})
		});

	});
});

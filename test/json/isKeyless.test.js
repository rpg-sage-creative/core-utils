import { isKeyless } from "../../build/index.js";
import { toString } from "../toString.mjs";
import { getTests } from "./data.js";

describe("json", () => {
	describe("isKeyless", () => {

		/** @type {[object, boolean, boolean][]} [object, empty, keyless] */
		const tests = getTests("isKeyless");

		tests.forEach(([object, empty, keyless]) => {
			test(`isKeyless(${toString(object)}) === ${keyless}`, () => {
				expect(isKeyless(object)).toBe(keyless);
			})
		});

	});
});

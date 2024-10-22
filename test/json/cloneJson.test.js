import { cleanJson, cloneJson, isPrimitive } from "../../build/index.js";
import { getTests } from "./data.js";

describe("json", () => {
	describe("cloneJson", () => {

		/** @type {[object, string, string][]} [object, string, label] */
		const tests = getTests("cloneJson");

		tests.forEach(([object, label]) => {
			test(`cloneJson(${label}) equals ${label}`, () => {
				// this does the cloning
				const cloned = cloneJson(object);

				// this removes the keys with undefined from the original
				const cleaned = cleanJson(object);

				// same data
				expect(cloned).toEqual(cleaned);

				// different object
				if (!isPrimitive(object)) {
					expect(cloned).not.toBe(cleaned);
				}
			});
		});

	});
});

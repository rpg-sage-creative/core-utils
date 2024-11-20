import { parseUuid, randomUuid } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("uuid", () => {
	describe("parseUuid", () => {

		const uuid = randomUuid();

		/** [ [input, output], ... ] */
		const tests = [
			[uuid, uuid],
			[`{"id":"${uuid}"}`, uuid],
			["1234567890123456", undefined],
			["control", undefined],
		];

		tests.forEach(([input, output]) => {
			test(`parseUuid(${toString(input)}) === ${toString(output)}`, () => {
				expect(parseUuid(input)).toBe(output);
			});
		})
	});
});

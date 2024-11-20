import { randomUuid, UuidMatcher } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("uuid", () => {
	describe("UuidMatcher", () => {

		const uuid = randomUuid();
		const matcher = new UuidMatcher(uuid);

		/** [ [input, output], ... ] */
		const tests = [
			[uuid, true],
			["control", false],
			[matcher, true],
			[null, false],
		];

		tests.forEach(([input, output]) => {
			test(`matcher.matches(${toString(input)}) === ${output}`, () => {
				expect(matcher.matches(input)).toBe(output);
			});
		});
	});

});

import { randomSnowflake, SnowflakeMatcher } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("snowflake", () => {
	describe("SnowflakeMatcher", () => {

		const snowflake = randomSnowflake();
		const matcher = new SnowflakeMatcher(snowflake);

		/** [ [input, output], ... ] */
		const tests = [
			[snowflake, true],
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

import { NIL_SNOWFLAKE, isSnowflake, randomSnowflake, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("snowflake", () => {
	describe("isSnowflake", () => {
		const tests = getTests(randomSnowflake(), NIL_SNOWFLAKE);
		tests.forEach(({ input, isSnowflakeResult }) => {
			test(`isSnowflake(${toLiteral(input)}) === ${toLiteral(isSnowflakeResult)}`, () => {
				expect(isSnowflake(input)).toBe(isSnowflakeResult);
			});
		});
	});
});

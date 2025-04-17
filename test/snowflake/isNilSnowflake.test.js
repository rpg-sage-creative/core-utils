import { NIL_SNOWFLAKE, isNilSnowflake, randomSnowflake, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("snowflake", () => {
	describe("isNilSnowflake", () => {
		const tests = getTests(randomSnowflake(), NIL_SNOWFLAKE);
		tests.forEach(({ input, isNilSnowflakeResult }) => {
			test(`isNilSnowflake(${toLiteral(input)}) === ${toLiteral(isNilSnowflakeResult)}`, () => {
				expect(isNilSnowflake(input)).toBe(isNilSnowflakeResult);
			});
		});
	});
});

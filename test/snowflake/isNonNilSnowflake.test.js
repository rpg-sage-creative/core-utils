import { NIL_SNOWFLAKE, isNonNilSnowflake, randomSnowflake, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("snowflake", () => {
	describe("isNonNilSnowflake", () => {
		const tests = getTests(randomSnowflake(), NIL_SNOWFLAKE);
		tests.forEach(({ input, isNonNilSnowflakeResult }) => {
			test(`isNonNilSnowflake(${toLiteral(input)}) === ${toLiteral(isNonNilSnowflakeResult)}`, () => {
				expect(isNonNilSnowflake(input)).toBe(isNonNilSnowflakeResult);
			});
		});
	});
});

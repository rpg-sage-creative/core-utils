import { NIL_SNOWFLAKE, orNilSnowflake, randomSnowflake, toLiteral } from "../../build/index.js";
import { getTests } from "./data.js";

describe("snowflake", () => {
	describe("orNilSnowflake", () => {
		const tests = getTests(randomSnowflake(), NIL_SNOWFLAKE);
		tests.forEach(({ input, orNilSnowflakeResult }) => {
			test(`orNilSnowflake(${toLiteral(input)}) === ${toLiteral(orNilSnowflakeResult)}`, () => {
				expect(orNilSnowflake(input)).toBe(orNilSnowflakeResult);
			});
		});
	});
});

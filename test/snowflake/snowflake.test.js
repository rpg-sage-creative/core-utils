import { NIL_SNOWFLAKE, isNilSnowflake, isNonNilSnowflake, isSnowflake, orNilSnowflake, randomSnowflake } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("snowflake", () => {

	const snowflake = randomSnowflake();

	/** [ [input, isSnowflakeResult, isNilSnowflakeResult, isNonNilSnowflakeResult, orNilSnowflakeResult], ... ]  */
	const tests = [
		["00000", false, false, false, NIL_SNOWFLAKE],
		[NIL_SNOWFLAKE, true, true, false, NIL_SNOWFLAKE],
		["1234567890", false, false, false, NIL_SNOWFLAKE],
		[snowflake, true, false, true, snowflake],
		["control", false, false, false, NIL_SNOWFLAKE],
	];

	describe("isSnowflake", () => {
		tests.forEach(([input, isSnowflakeResult, isNilSnowflakeResult, isNonNilSnowflakeResult, orNilSnowflakeResult]) => {
			test(`isSnowflake(${toString(input)}) === ${toString(isSnowflakeResult)}`, () => {
				expect(isSnowflake(input)).toBe(isSnowflakeResult);
			});
		});
	});

	describe("isNilSnowflake", () => {
		tests.forEach(([input, isSnowflakeResult, isNilSnowflakeResult, isNonNilSnowflakeResult, orNilSnowflakeResult]) => {
			test(`isNilSnowflake(${toString(input)}) === ${toString(isNilSnowflakeResult)}`, () => {
				expect(isNilSnowflake(input)).toBe(isNilSnowflakeResult);
			});
		});
	});

	describe("isNonNilSnowflake", () => {
		tests.forEach(([input, isSnowflakeResult, isNilSnowflakeResult, isNonNilSnowflakeResult, orNilSnowflakeResult]) => {
			test(`isNonNilSnowflake(${toString(input)}) === ${toString(isNonNilSnowflakeResult)}`, () => {
				expect(isNonNilSnowflake(input)).toBe(isNonNilSnowflakeResult);
			});
		});
	});

	describe("orNilSnowflake", () => {
		tests.forEach(([input, isSnowflakeResult, isNilSnowflakeResult, isNonNilSnowflakeResult, orNilSnowflakeResult]) => {
			test(`orNilSnowflake(${toString(input)}) === ${toString(orNilSnowflakeResult)}`, () => {
				expect(orNilSnowflake(input)).toBe(orNilSnowflakeResult);
			});
		});
	});

});

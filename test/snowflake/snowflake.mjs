import { assert, runTests, warn, NIL_SNOWFLAKE, isNilSnowflake, isNonNilSnowflake, isSnowflake, orNilSnowflake } from "../../build/index.js";

runTests(async function test_snowflake() {
	const zero = "00000";
	assert(false, isSnowflake, zero);
	assert(false, isNilSnowflake, zero);
	assert(false, isNonNilSnowflake, zero);

	assert(true, isSnowflake, NIL_SNOWFLAKE);
	assert(true, isNilSnowflake, NIL_SNOWFLAKE);
	assert(false, isNonNilSnowflake, NIL_SNOWFLAKE);

	const short = "1234567890";
	assert(false, isSnowflake, short);
	assert(false, isNilSnowflake, short);
	assert(false, isNonNilSnowflake, short);

	const snowflake = "1234567890123456";
	assert(true, isSnowflake, snowflake);
	assert(false, isNilSnowflake, snowflake);
	assert(true, isNonNilSnowflake, snowflake);

	assert(snowflake, orNilSnowflake, snowflake);
	assert(NIL_SNOWFLAKE, orNilSnowflake, "bob");

	// assert(true, isSnowflake, randomSnowflake());
	// assert(false, isNilSnowflake, randomSnowflake());
	// assert(true, isNonNilSnowflake, randomSnowflake());

	warn(`Create some tests for SnowflakeMatcher`);
}, true);

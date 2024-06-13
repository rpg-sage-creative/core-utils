import { assert, runTests, parseSnowflake, randomSnowflake } from "../../build/index.js";

runTests(async function test_parseSnowflake() {
	const short = "123456789012345";
	const min = "1234567890123456";
	const id = randomSnowflake();
	const channelId = `<#${id}>`;
	const roleId = `<@&${id}>`;
	const userId = `<@${id}>`;
	const control = "control";
	assert(undefined, parseSnowflake, short);
	assert(min, parseSnowflake, min);
	assert(id, parseSnowflake, id);
	assert(id, parseSnowflake, channelId);
	assert(id, parseSnowflake, roleId);
	assert(id, parseSnowflake, userId);
	assert(undefined, parseSnowflake, control);
}, true);

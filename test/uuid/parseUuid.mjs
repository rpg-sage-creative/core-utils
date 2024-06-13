import { assert, runTests, parseUuid, randomUuid } from "../../build/index.js";

runTests(async function test_parseUuid() {
	const uuid = randomUuid();
	assert(uuid, parseUuid, uuid);

	const json = `{"id":"${uuid}"}`;
	assert(uuid, parseUuid, json);

	const snowflake = "1234567890123456";
	assert(undefined, parseUuid, snowflake);

	const control = "control";
	assert(undefined, parseUuid, control);
}, true);

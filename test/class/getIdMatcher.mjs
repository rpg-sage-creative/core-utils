import { assert, getIdMatcher, runTests, startAsserting } from "../../build/index.js";

runTests(async function test_getIdMatcher() {
	const snowflake = "1234567890123456";
	const uuid = "1b6ace60-64cf-4a52-ab74-db0349655157";
	const bob = "bob";

	startAsserting("getIdMatcher(snowflake)");
	const snowflakeMatcher = getIdMatcher(snowflake);
	const snowflakeTester = id => snowflakeMatcher.matches(id);
	assert(true, snowflakeTester, snowflake);
	assert(false, snowflakeTester, uuid);
	assert(false, snowflakeTester, bob);

	startAsserting("getIdMatcher(uuid)");
	const uuidMatcher = getIdMatcher(uuid);
	const uuidTester = id => uuidMatcher.matches(id);
	assert(false, uuidTester, snowflake);
	assert(true, uuidTester, uuid);
	assert(false, uuidTester, bob);

	startAsserting("getIdMatcher(bob)");
	const bobMatcher = getIdMatcher(bob);
	const bobTester = id => bobMatcher.matches(id);
	assert(false, bobTester, snowflake);
	assert(false, bobTester, uuid);
	assert(false, bobTester, bob);
}, true);
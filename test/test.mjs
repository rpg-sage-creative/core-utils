import { assert, runTests, setAssertMode, startAsserting, stopAsserting } from "../build/index.js"

runTests(async function test_testUtils() {
	// test assert
	startAsserting("assert");
	function assertTester(...args) { return args.length; }
	assert(2, assertTester, "one", "two");
	assert(3, assertTester, "one", "two", 3, 4);
	assert(null, assertTester);
	assert(undefined, assertTester);
	assert(undefined, () => undefined);
	assert(undefined, () => null);
	stopAsserting();

	// test assert modes
	startAsserting("AssertMode");
	assert(true, "pass");
	assert(false, "fail");
	setAssertMode("pass");
	assert(true, "pass", "pass");
	assert(false, "fail", "fail");
	setAssertMode("both");
	assert(true, "pass", "pass", "pass");
	assert(false, "fail", "fail", "fail");
	setAssertMode("fail");
	assert(true, "pass", "pass", "pass", "pass");
	assert(false, "fail", "fail", "fail", "fail");
	stopAsserting();
});

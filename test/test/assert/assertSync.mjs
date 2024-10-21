import { assertSync, runTests } from "../../../build/index.js";

runTests(async function test_assertSync() {
	function assertTester(...args) { return args.length; }

	// should not fail
	assertSync(2, assertTester, "one", "two");
	assertSync(undefined, () => undefined);

	// should fail and get logged
	assertSync(3, assertTester, "one", "two", 3, "this failure is a valid part of a successful test");
	assertSync(null, assertTester, "this failure is a valid part of a successful test");
	assertSync(undefined, assertTester, "this failure is a valid part of a successful test");
	assertSync(undefined, () => null, f => f, function empty() { }, "this failure is a valid part of a successful test");
});

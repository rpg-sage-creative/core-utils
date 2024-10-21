import { assertAsync, runTests } from "../../../build/index.js";

runTests(async function test_assertAsync() {
	function assertAsyncTester(...args) { return args.length; }

	// should not fail
	assertAsync(2, assertAsyncTester, "one", "two");
	assertAsync(undefined, () => undefined);

	// should fail and get logged
	assertAsync(3, assertAsyncTester, "one", "two", 3, "this failure is a valid part of a successful test");
	assertAsync(null, assertAsyncTester, "this failure is a valid part of a successful test");
	assertAsync(undefined, assertAsyncTester, "this failure is a valid part of a successful test");
	assertAsync(undefined, () => null, f => f, function empty() { }, "this failure is a valid part of a successful test");
});

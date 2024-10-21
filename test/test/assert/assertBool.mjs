import { assertBool, runTests, setAssertMode, startAsserting, stopAsserting } from "../../../build/index.js";

runTests(async function test_assertBool() {
	// test assert modes
	startAsserting("AssertMode");

	// default means only a false ("assert-fail") should be logged
	assertBool(true, "AssertMode: fail (default)");
	assertBool(false, "AssertMode: default", "this failure is a valid part of a successful test");

	// now a true ("assert-pass") should be logged
	setAssertMode("pass");
	assertBool(true, "AssertMode: pass");
	assertBool(false, "AssertMode: pass", "this failure is a valid part of a successful test");

	// now both true ("assert-pass") and false ("assert-fail") should be logged
	setAssertMode("both");
	assertBool(true, "AssertMode: both");
	assertBool(false, "AssertMode: both", "this failure is a valid part of a successful test");

	// back to default; only a false ("assert-fail") should be logged
	setAssertMode("fail");
	assertBool(true, "AssertMode: fail (default)");
	assertBool(false, "AssertMode: fail (default)", "this failure is a valid part of a successful test");

	stopAsserting();
});

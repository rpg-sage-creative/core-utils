import { debug, info, warn } from "@rsc-utils/console-utils";
import { assert, runTests, startAsserting, stopAsserting } from "@rsc-utils/test-utils";

runTests(async function testFunction() {
	assert(false, "No Tests!");
	info();
	debug();
	warn();
	error();
}, true);

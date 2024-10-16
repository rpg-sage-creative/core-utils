import { addCommas, assert, runTests } from "../../build/index.js";

runTests(async function test_addCommas() {
	assert("12,345", addCommas, 12345);
	assert("12,345,678", addCommas, 12345678);
	assert("12,345,678.09", addCommas, 12345678.09);
}, true);
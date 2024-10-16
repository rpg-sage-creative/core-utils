import { assert, nth, runTests } from "../../build/index.js";

runTests(async function test_nth() {
	assert("1st", nth, 1);
	assert("2nd", nth, 2);
	assert("3rd", nth, 3);
	assert("4th", nth, 4);
	assert("5th", nth, 5);
	assert("21st", nth, 21);
	assert("32nd", nth, 32);
	assert("43rd", nth, 43);
}, true);
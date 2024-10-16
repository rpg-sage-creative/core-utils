import { assert, isValidNumber, runTests } from "../../build/index.js";

runTests(async function test_isValidNumber() {
	["", "a", false, true, new Date(), [], {}, 0n, 1n, NaN, Infinity].forEach(value => {
		assert(false, isValidNumber, value);
	});
	[0, 1].forEach(value => {
		assert(true, isValidNumber, value);
	});
}, true);
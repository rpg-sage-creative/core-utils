import { assert, isNumber, runTests } from "../../build/index.js";

runTests(async function test_isNumber() {
	["", "a", 0n, 1n, false, true, new Date(), [], {}].forEach(value => {
		assert(false, isNumber, value);
	});
	[0, 1, NaN, Infinity].forEach(value => {
		assert(true, isNumber, value);
	});
}, true);
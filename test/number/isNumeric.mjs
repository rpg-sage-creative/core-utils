import { assert, isNumeric, runTests } from "../../build/index.js";

runTests(async function test_isNumeric() {
	["", "a", false, true, new Date(), [], {}].forEach(value => {
		assert(false, isNumeric, value);
	});
	[0, 1, 0n, 1n, NaN, Infinity].forEach(value => {
		assert(true, isNumeric, value);
	});
}, true);
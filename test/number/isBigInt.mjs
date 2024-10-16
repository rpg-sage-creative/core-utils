import { assert, isBigInt, runTests } from "../../build/index.js";

runTests(async function test_isBigInt() {
	["", "a", 0, 1, false, true, new Date(), [], {}, NaN, Infinity].forEach(value => {
		assert(false, isBigInt, value);
	});
	assert(true, isBigInt, 0n);
}, true);
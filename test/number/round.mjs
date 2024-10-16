import { assert, round, runTests } from "../../build/index.js";

runTests(async function test_round() {
	assert(1, round, 1.000999, 0);
	assert(2, round, 1.9999, 0);
	assert(1.001, round, 1.000999, 4);
	assert(1.00067, round, 1.000666, 5);
}, true);
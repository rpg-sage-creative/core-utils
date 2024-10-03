import { info, assert, runTests, omit } from "../../build/index.js";

runTests(function test_omit() {
	const A = { a:"A" };
	const B = { b:"B" };
	const AB = { a:"A", b:"B" };
	const ABC = { a:"A", b:"B", c:"C" };

	assert(A, omit, A, "b");
	assert(A, omit, A, "b");
	assert(B, omit, AB, "a");
	assert(AB, omit, ABC, "c");
	assert(B, omit, ABC, "a", "c");
	assert({}, omit, ABC, "a", "b", "c");
	assert({}, omit, ABC, ..."abc"); // experimenting with spread
	assert(null, omit, null);
	assert(undefined, omit);
}, true);
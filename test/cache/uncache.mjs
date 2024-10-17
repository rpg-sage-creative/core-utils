import { assert, runTests, uncache } from "../../build/index.js";

runTests(async function test_uncache() {

	const object = { a:"A", b:"B", c:new Set(["A","B"]) };

	uncache(object);
	assert({ a:"A", b:"B", c:new Set() }, () => object);

	uncache(object, { nullify:true });
	assert({ a:null, b:null, c:null }, () => object);

	uncache(object, { undefine:true });
	assert({ }, () => object);

}, true);
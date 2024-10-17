import { HasCore, assert, runTests } from "../../build/index.js";

class HasCoreTester extends HasCore { }

runTests(async function test_HasCore() {
	const hasCore = new HasCoreTester({ objectType:"Tester" });
	assert(hasCore.is(hasCore), "hasCore.is(hasCore) failed");
	assert(hasCore.is(hasCore.core), "hasCore.is(hasCore.core) failed");
	assert(hasCore.is({core:hasCore.core}), "hasCore.is({core:hasCore.core}) failed");
	assert(hasCore.is(hasCore.toJSON()), "hasCore.is(hasCore.toJSON()) failed");
	assert(!hasCore.is(null), "!hasCore.is(null) failed");
	assert(!hasCore.is(new HasCoreTester({ objectType:"Tester" })), "!new HasCoreTester({ objectType:\"Tester\" })) failed");
}, true);
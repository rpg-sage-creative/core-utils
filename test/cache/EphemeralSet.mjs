import { assert, EphemeralSet, pause, runTests } from "../../build/index.js";

runTests(async function test_EphemeralSet() {

	const a = { a:"A" };
	const b = { b:"B" };

	const ms = 250;
	const pms = ms / 2;
	const set = new EphemeralSet(ms);

	assert(ms, s => s.msToLive, set);
	assert(0, s => s.size, set);
	assert(false, (s, o) => s.has(o), set, a);
	assert(false, (s, o) => s.has(o), set, b);

	// add first item
	set.add(a);
	assert(1, s => s.size, set, "added a");
	assert(true, (s, o) => s.has(o), set, a);
	assert(false, (s, o) => s.has(o), set, b);

	// pause half the timeout
	await pause(pms);

	// add a second item
	set.add(b);
	assert(2, s => s.size, set, "added b");
	assert(true, (s, o) => s.has(o), set, a);
	assert(true, (s, o) => s.has(o), set, b);

	// pause half, making it a full since first item added
	await pause(pms);

	// verify first is gone
	assert(1, s => s.size, set, "a should be gone");
	assert(false, (s, o) => s.has(o), set, a);
	assert(true, (s, o) => s.has(o), set, b);

	// pause half, making it half since 2nd timer was initiated
	await pause(pms);

	// verify b is still there, even though expired, because the timer hasn't fired
	assert(1, s => s.size, set, "b still here");
	assert(false, (s, o) => s.has(o), set, a);
	assert(true, (s, o) => s.has(o), set, b);

	// pause half, making it two full since first item added
	await pause(pms);

	// verify second is gone
	assert(0, s => s.size, set, "b should be gone");
	assert(false, (s, o) => s.has(o), set, a);
	assert(false, (s, o) => s.has(o), set, b);

	// pause just to pad time
	await pause(pms);

	set.add(a);
	assert(1, s => s.size, set);

	// pause just to pad time
	await pause(pms);

	assert(1, s => s.size, set);
	set.clear();
	assert(0, s => s.size, set);

}, true);
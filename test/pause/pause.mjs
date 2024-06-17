import { assert, pause, runTests } from "../../build/index.js";

runTests(async function test_pause() {

	const ms = 500;

	const start = Date.now();
	const retVoid = await pause(ms, "retVoid");
	const stop = Date.now();
	assert(true, () => stop - start >= 500);
	assert(void(0), () => retVoid);

	const obj = { "a":"B" };
	const retObj = await pause({ ms, label:"retObj", data:obj, log:true });
	assert(obj, () => retObj);

}, true);
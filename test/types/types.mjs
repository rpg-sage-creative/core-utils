import { info, assert, runTests, isDefined, isNullOrUndefined, isPrimitive, isBoolean, isString } from "../../build/index.js";

runTests(function test_typeUtils() {
	//#region isDefined
	info(`Testing isDefined ...`);
	[
		[null, false],
		[undefined, false],
		["", true],
		[[], true],
		[{}, true],
		[0, true],
		[false, true],
		[new Date(), true]
	]
	.forEach(([value, bool]) => assert(bool, isDefined, value));
	//#endregion

	//#region isNullOrUndefined
	info(`Testing isNullOrUndefined ...`);
	[
		[null, true],
		[undefined, true],
		["", false],
		[[], false],
		[{}, false],
		[0, false],
		[false, false],
		[new Date(), false]
	]
	.forEach(([value, bool]) => assert(bool, isNullOrUndefined, value));
	//#endregion

	//#region isPrimitive
	info(`Testing isPrimitive ...`);
	[
		[null, true],
		[undefined, true],
		["", true],
		[[], false],
		[{}, false],
		[0, true],
		[false, true],
		[new Date(), true]
	]
	.forEach(([value, bool]) => assert(bool, isPrimitive, value));
	//#endregion

	//#region isBoolean
	info(`Testing isBoolean ...`);
	[
		[null, false],
		[undefined, false],
		["", false],
		[[], false],
		[{}, false],
		[0, false],
		[false, true],
		[true, true],
		[new Date(), false]
	]
	.forEach(([value, bool]) => assert(bool, isBoolean, value));
	//#endregion

	//#region isString
	info(`Testing isString ...`);
	[
		[null, false],
		[undefined, false],
		["", true],
		[[], false],
		[{}, false],
		[0, false],
		[false, false],
		[new Date(), false]
	]
	.forEach(([value, bool]) => assert(bool, isString, value));
	//#endregion
}, true);
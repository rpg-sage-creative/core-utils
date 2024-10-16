import { assert, isBigInt, isBoolean, isDefined, isFiniteNumber, isNullOrUndefined, isNumber, isNumeric, isPrimitive, isString, runTests } from "../../build/index.js";

runTests(function test_isBigInt() {
	[
		[null, false],
		[undefined, false],
		[false, false],
		[true, false],
		[0n, true],
		[1n, true],
		[new Date(), false],
		[0, false],
		[1, false],
		[NaN, false],
		[Infinity, false],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isBigInt, value));
}, true);

runTests(function test_isBoolean() {
	[
		[null, false],
		[undefined, false],
		[false, true],
		[true, true],
		[0n, false],
		[1n, false],
		[new Date(), false],
		[0, false],
		[1, false],
		[NaN, false],
		[Infinity, false],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isBoolean, value));
}, true);

runTests(function test_isDefined() {
	[
		[null, false],
		[undefined, false],
		[false, true],
		[true, true],
		[0n, true],
		[1n, true],
		[new Date(), true],
		[0, true],
		[1, true],
		[NaN, true],
		[Infinity, true],
		["", true],
		["a", true],
		[[], true],
		[{}, true],
	]
	.forEach(([value, bool]) => assert(bool, isDefined, value));
}, true);

runTests(function test_isFiniteNumber() {
	[
		[null, false],
		[undefined, false],
		[false, false],
		[true, false],
		[0n, false],
		[1n, false],
		[new Date(), false],
		[0, true],
		[1, true],
		[NaN, false],
		[Infinity, false],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isFiniteNumber, value));
}, true);

runTests(function test_isNullOrUndefined() {
	[
		[null, true],
		[undefined, true],
		[false, false],
		[true, false],
		[0n, false],
		[1n, false],
		[new Date(), false],
		[0, false],
		[1, false],
		[NaN, false],
		[Infinity, false],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isNullOrUndefined, value));
}, true);

runTests(function test_isNumber() {
	[
		[null, false],
		[undefined, false],
		[false, false],
		[true, false],
		[0n, false],
		[1n, false],
		[new Date(), false],
		[0, true],
		[1, true],
		[NaN, true],
		[Infinity, true],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isNumber, value));
}, true);

runTests(function test_isNumeric() {
	[
		[null, false],
		[undefined, false],
		[false, false],
		[true, false],
		[0n, true],
		[1n, true],
		[new Date(), false],
		[0, true],
		[1, true],
		[NaN, true],
		[Infinity, true],
		["", false],
		["a", false],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isNumeric, value));
}, true);

runTests(function test_isPrimitive() {
	[
		[null, true],
		[undefined, true],
		[false, true],
		[true, true],
		[0n, true],
		[1n, true],
		[new Date(), true],
		[0, true],
		[1, true],
		[NaN, true],
		[Infinity, true],
		["", true],
		["a", true],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isPrimitive, value));
}, true);

runTests(function test_isString() {
	[
		[null, false],
		[undefined, false],
		[false, false],
		[true, false],
		[0n, false],
		[1n, false],
		[new Date(), false],
		[0, false],
		[1, false],
		[NaN, false],
		[Infinity, false],
		["", true],
		["a", true],
		[[], false],
		[{}, false],
	]
	.forEach(([value, bool]) => assert(bool, isString, value));
}, true);

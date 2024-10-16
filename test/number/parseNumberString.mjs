import { assert, parseNumberString, runTests } from "../../build/index.js";

runTests(async function test_parseNumberString() {
	assert("super-number", parseNumberString("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹")?.type);
	assert("super-bigint", parseNumberString("¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁸⁹")?.type);
	assert("sub-number", parseNumberString("₁₂₃₄₅₆₇₈\u2024₉₉")?.type);
	assert("sub-bigint", parseNumberString("₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₈₉")?.type);
}, true);
import { assert, runTests, addCommas, isBigInt, isNumber, isNumeric, isValidNumber, nth, parseNumberString, parseSubscript, parseSuperscript, round, toSubscript, toSuperscript } from "../../build/index.js";

runTests(async function test_superscript() {
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript(12345678.09));
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript(parseSubscript("₁₂₃₄₅₆₇₈\u2024₀₉")));
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁹⁹", toSuperscript(0.9 + parseSubscript(toSubscript(12345678.09))));
}, true);
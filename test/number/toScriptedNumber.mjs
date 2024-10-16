import { assert, parseNumeric, runTests, toSubscript, toSuperscript } from "../../build/index.js";

runTests(async function test_toSubscript() {
	assert("₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, 12345678.09);
	assert("₋₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, -12345678.09);
	assert("₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, parseNumeric("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"));
	assert("₋₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, parseNumeric("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"));
	assert("₁₂₃₄₅₆₇₈\u2024₉₉", toSubscript, 0.9 + parseNumeric(toSuperscript(12345678.09)));
	assert("₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", toSubscript, 12345678123456709n);
}, true);

runTests(async function test_toSuperscript() {
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, 12345678.09);
	assert("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, -12345678.09);
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, parseNumeric("₁₂₃₄₅₆₇₈\u2024₀₉"));
	assert("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, parseNumeric("₋₁₂₃₄₅₆₇₈\u2024₀₉"));
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁹⁹", toSuperscript, 0.9 + parseNumeric(toSubscript(12345678.09)));
	assert("¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", toSuperscript, 12345678123456709n);
}, true);
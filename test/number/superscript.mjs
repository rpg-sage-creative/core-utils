import { assert, parseSubscript, runTests, toSubscript, toSuperscript } from "../../build/index.js";

runTests(async function test_superscript() {
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, 12345678.09);
	assert("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, -12345678.09);
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, parseSubscript("₁₂₃₄₅₆₇₈\u2024₀₉"));
	assert("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", toSuperscript, parseSubscript("₋₁₂₃₄₅₆₇₈\u2024₀₉"));
	assert("¹²³⁴⁵⁶⁷⁸\u22C5⁹⁹", toSuperscript, 0.9 + parseSubscript(toSubscript(12345678.09)));
	assert("¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", toSuperscript, 12345678123456709n);
}, true);
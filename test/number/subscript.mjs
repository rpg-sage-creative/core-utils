import { assert, parseSuperscript, runTests, toSubscript, toSuperscript } from "../../build/index.js";

runTests(async function test_subscript() {
	assert("₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, 12345678.09);
	assert("₋₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, -12345678.09);
	assert("₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, parseSuperscript("¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"));
	assert("₋₁₂₃₄₅₆₇₈\u2024₀₉", toSubscript, parseSuperscript("⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"));
	assert("₁₂₃₄₅₆₇₈\u2024₉₉", toSubscript, 0.9 + parseSuperscript(toSuperscript(12345678.09)));
	assert("₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", toSubscript, 12345678123456709n);
}, true);
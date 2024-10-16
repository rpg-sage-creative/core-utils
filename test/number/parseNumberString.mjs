import { assert, parseNumberString, runTests } from "../../build/index.js";

function parse(value, key) {
	const result = parseNumberString(value);
	// console.log({value,key,result});
	return result?.[key];
}

runTests(async function test_parseNumberString() {
	assert("super-number", parse, "⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", "type");
	assert(-12345678.09, parse, "⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", "numericValue");

	assert("super-number", parse, "¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", "type");
	assert(12345678.09, parse, "¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", "numericValue");

	assert("super-bigint", parse, "¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", "type");
	assert(12345678123456709n, parse, "¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", "numericValue");

	assert("super-bigint", parse, "⁻¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", "type");
	assert(-12345678123456709n, parse, "⁻¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", "numericValue");

	assert("sub-number", parse, "₋₁₂₃₄₅₆₇₈\u2024₀₉", "type");
	assert(-12345678.09, parse, "₋₁₂₃₄₅₆₇₈\u2024₀₉", "numericValue");

	assert("sub-number", parse, "₁₂₃₄₅₆₇₈\u2024₀₉", "type");
	assert(12345678.09, parse, "₁₂₃₄₅₆₇₈\u2024₀₉", "numericValue");

	assert("sub-bigint", parse, "₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", "type");
	assert(12345678123456709n, parse, "₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", "numericValue");

	assert("sub-bigint", parse, "₋₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", "type");
	assert(-12345678123456709n, parse, "₋₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", "numericValue");
}, true);
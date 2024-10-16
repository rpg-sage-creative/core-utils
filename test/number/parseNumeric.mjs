import { assert, parseNumeric, parseNumericString, runTests } from "../../build/index.js";

runTests(async function test_parseNumeric() {
	[
		["12345678.09", 12345678.09, "number"],
		["-12345678.09", -12345678.09, "number"],
		["12345678123456709", 12345678123456709n, "bigint"],
		["-12345678123456709", -12345678123456709n, "bigint"],
		["¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", 12345678.09, "super-number"],
		["⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", -12345678.09, "super-number"],
		["¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", 12345678123456709n, "super-bigint"],
		["⁻¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", -12345678123456709n, "super-bigint"],
		["₁₂₃₄₅₆₇₈\u2024₀₉", 12345678.09, "sub-number"],
		["₋₁₂₃₄₅₆₇₈\u2024₀₉", -12345678.09, "sub-number"],
		["₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", 12345678123456709n, "sub-bigint"],
		["₋₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉", -12345678123456709n, "sub-bigint"],
		["blah", NaN, "number"],
	]
	.forEach(([stringValue, numericValue, type]) => {
		assert(numericValue, parseNumeric, stringValue);
		assert(type, value => parseNumericString(value)?.["type"], stringValue);
	});
}, true);
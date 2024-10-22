import { toSubscript, toSuperscript } from "../../build/index.js";

function toString(value) {
	switch (typeof(value)) {
		case "string": return JSON.stringify(value);
		case "bigint": return `${value}n`;
		default: return String(value);
	}
}

describe("number", () => {
	/** @type {({numeric:number|bigint;super:string;sub:string;})[]} { numeric, super, sub } */
	const tests = [
		{ numeric:12345678.09, sup:"¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", sub:"₁₂₃₄₅₆₇₈\u2024₀₉" },
		{ numeric:-12345678.09, sup:"⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹", sub:"₋₁₂₃₄₅₆₇₈\u2024₀₉" },
		{ numeric:12345678123456709n, sup:"¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", sub:"₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉" },
		{ numeric:-12345678123456709n, sup:"⁻¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹", sub:"₋₁₂₃₄₅₆₇₈₁₂₃₄₅₆₇₀₉" },
	];

	describe("toSubscript", () => {
		tests.forEach(({numeric, sub}) => {
			test(`toSubscript(${toString(numeric)}) === ${toString(sub)}`, () => {
				expect(toSubscript(numeric)).toBe(sub);
			});
		});
	});

	describe("toSuperscript", () => {
		tests.forEach(({numeric, sup}) => {
			test(`toSuperscript(${toString(numeric)}) === ${toString(sup)}`, () => {
				expect(toSuperscript(numeric)).toBe(sup);
			});
		});
	});

});

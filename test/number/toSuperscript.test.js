import { toSuperscript } from "../../build/index.js";

function toString(value) {
	switch (typeof(value)) {
		case "string": return JSON.stringify(value);
		case "bigint": return `${value}n`;
		default: return String(value);
	}
}

describe("number", () => {
	/** @type {[number|bigint,string][]} [input, output] */
	const tests = [
		[12345678.09, "¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"],
		[-12345678.09, "⁻¹²³⁴⁵⁶⁷⁸\u22C5⁰⁹"],
		[12345678123456709n, "¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹"],
		[-12345678123456709n, "⁻¹²³⁴⁵⁶⁷⁸¹²³⁴⁵⁶⁷⁰⁹"],
	];

	describe("toSuperscript", () => {
		tests.forEach(([input, output]) => {
			test(`toSuperscript(${toString(input)}) === ${toString(output)}`, () => {
				expect(toSuperscript(input)).toBe(output);
			});
		});
	});

});

import { isKeyValueArg, quote, wrap } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("args", () => {
	describe("isKeyValueArg", () => {
		// “”, „“, „”, "", '', ‘’
		const quotes = [`“”`, `„“`, `„”`, `""`, `''`, `‘’`, `«»`, `»«`];
		const goodKeys = ["lower", "UPPER", "camelCase", "dot.notation", "dash-notation"];
		const empties = quotes.slice();
		const values = quotes.map(quotes => wrap("value", quotes));
		const quotedValues = values.map(value => quote(`quoted ${value}`));
		const doubleQuotedValues = quotedValues.map(value => quote(value));

		const options = { allowDashes:true, allowPeriods:true };
		const nonEmptyOptions = { allowDashes:true, allowPeriods:true, quantifier:"+" };

		const emptyTests = goodKeys.map(key => empties.map(val => `${key}=${val}`)).flat();
		emptyTests.forEach(value => {
			test(`isKeyValueArg(${toString(value)}, ${toString(options)}) === true`, () => {
				expect(isKeyValueArg(value, options)).toBe(true);
			});
			test(`isKeyValueArg(${toString(value)}, ${toString(nonEmptyOptions)}) === false`, () => {
				expect(isKeyValueArg(value, nonEmptyOptions)).toBe(false);
			})
		});

		const goodValues = values.concat(quotedValues).concat(doubleQuotedValues);
		const goodTests = goodKeys.map(key => goodValues.map(val => `${key}=${val}`)).flat();
		goodTests.forEach(value => {
			test(`isKeyValueArg(${toString(value)}, ${toString(options)}) === true`, () => {
				expect(isKeyValueArg(value, options)).toBe(true);
			});
		});

		const badValues = [``, `=`, `= `, `=" '`];
		const badTests = goodKeys.map(key => badValues.map(val => key+val)).flat();
		badTests.forEach(value => {
			test(`isKeyValueArg(${toString(value)}, ${toString(options)}) === false`, () => {
				expect(isKeyValueArg(value, options)).toBe(false);
			});
		});

		const modeTests = [
			{ input:`defaultKey=defaultValue`, options:undefined, expected:true },
			{ input:`defaultKey=defaultValue`, options:{mode:"strict"}, expected:false },
			{ input:`strictKey="strict value"`, options:undefined, expected:true },
			{ input:`sloppyKey= "sloppy value"`, options:undefined, expected:false },
			{ input:`sloppyKey ="sloppy value"`, options:undefined, expected:false },
			{ input:`sloppyKey = "sloppy value"`, options:undefined, expected:false },
			{ input:`sloppyKey= "sloppy value"`, options:{mode:"sloppy"}, expected:true },
			{ input:`sloppyKey ="sloppy value"`, options:{mode:"sloppy"}, expected:true },
			{ input:`sloppyKey = "sloppy value"`, options:{mode:"sloppy"}, expected:true },
			{ input:`a=b`, options:{anchored:true}, expected:true },
			{ input:`a=b`, options:{anchored:true,capture:"arg"}, expected:true },
			{ input:`a=b`, options:{capture:"arg"}, expected:true },
			{ input:`a="b"`, options:{anchored:true}, expected:true },
			{ input:`a='b'`, options:{anchored:true,capture:"arg"}, expected:true },
			{ input:`a="b"`, options:{capture:"arg"}, expected:true },
		];
		modeTests.forEach(({ input, options, expected }) => {
			test(`isKeyValueArg(${toString(input)}, ${toString(options)}) === ${expected}`, () => {
				expect(isKeyValueArg(input, options)).toBe(expected);
			});
		});

	});
});

import { isQuoted } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("isQuoted", () => {

		const tests = [
			{ input:``, style:undefined, expected:false },
			{ input:` '‘"“„ `, style:undefined, expected:false },

			{ input:` 'normal single' `, style:undefined, expected:false },
			{ input:` ‘fancy single’ `, style:undefined, expected:false },
			{ input:` "normal double" `, style:undefined, expected:false },
			{ input:` “fancy double” `, style:undefined, expected:false },
			{ input:` „extended double“ `, style:undefined, expected:false },
			{ input:` „extended double” `, style:undefined, expected:false },

			{ input:`'normal single'`, style:undefined, expected:true },
			{ input:`‘fancy single’`, style:undefined, expected:true },
			{ input:`"normal double"`, style:undefined, expected:true },
			{ input:`“fancy double”`, style:undefined, expected:true },
			{ input:`„extended double“`, style:undefined, expected:true },
			{ input:`„extended double”`, style:undefined, expected:true },

			{ input:`"normal double"`, style:"double", expected:true },
			{ input:`"normal double"`, style:"single", expected:false },

			{ input:`“fancy double”`, style:"double", expected:true },
			{ input:`“fancy double”`, style:"strict", expected:false },
			{ input:`“fancy double”`, style:"fancy", expected:true },

			{ input:`'normal single'`, style:"double", expected:false },
			{ input:`'normal single'`, style:"single", expected:true },

			// { input:``, style:undefined, expected:false },
		];

		tests.forEach(({ input, style, expected }) => {

			test(`isQuoted(${toString(input)}, ${toString(style)}) === ${expected}`, () => {
				expect(isQuoted(input, style)).toBe(expected);
			});

		});

	});
});